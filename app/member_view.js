var React = require('react-native');
var _ = require('underscore');

var env = require('./env');

var Button = require('react-native-button');

var baseStyles = require('./styles/base');

var Geolocation = require('./lib/geolocation');
var Logo = require('./logo_view');

var {
  View,
  Text,
  TextInput,
  AlertIOS,
  Image
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      currentLocation: {},
      bookingNumber: "",
      address: this.props.route.props.address,
      loading: false
    };
  },

  componentDidMount: function() {
    this.geolocation = new Geolocation();
    this.geolocation.getCurrentLocation().then((location) => {
      this.setState({ currentLocation: location });
    }).catch((error) => console.log(error));
  },

  renderMemberView: function() {
    return <View style={{flexDirection: 'row', width: 200, height: 30, padding: 0, borderBottomWidth: 1, marginLeft: 60, marginTop: 20, borderBottomColor: "#ffffff"}}>
      <TextInput
        placeholder="Booking reference"
        returnKeyType="done"
        keyboardType="numbers-and-punctuation"
        placeholderTextColor="#ffffff"
        style={[baseStyles.input, { flex: 0.8 }]}
        onChangeText={(text) => this.setState({bookingNumber: text})}
        value={this.state.bookingNumber}
        onSubmitEditing={this.submitJourney}
      />
    </View>;
  },

  render: function () {
    return (
      <View>
        <Image source={require('image!senaatti1')} style={baseStyles.backgroundImage} resizeMode='cover' />
        <Logo/>
        <Text style={baseStyles.goText}>What is your booking reference?</Text>
        {this.renderMemberView()}
      </View>
    );
  },

  submitJourney: function() {
    if (_.isEmpty(this.state.currentLocation)) {
      return AlertIOS.alert("Current locatiot not found yet :(");
    }

    if (_.isEmpty(this.state.bookingNumber) || _.isNaN(Number(this.state.bookingNumber))) {
      return AlertIOS.alert("Member Number is missing or isn't number");
    }
    fetch(`${env.apiHost}/customers`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "member_number": Number(this.state.bookingNumber)})
    }).then((response) => {
      this.setState({loading: false});
      return response.text();
    }).then((responseText) => {
      var body = JSON.parse(responseText);
      console.log(body)
      lat = this.state.currentLocation.lat
      lon = this.state.currentLocation.lon
      latLon=`lon=${lon}&lat=${lat}`
      url = `${env.apiHost}/journeys/${body.id}?${latLon}`
      console.log(url)
      fetch(url, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.text();
      }).then((journeyResp) => {
        console.log(journeyResp)
        var journey = JSON.parse(journeyResp);
        journey["final_address"] = this.state.address
        this.props.onForward(journey);
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error)
      AlertIOS.alert("Error error");
    });
  }
});
