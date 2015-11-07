var React = require('react-native');
var _ = require('underscore');

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
      address: this.props.route.props.address
    };
  },

  componentDidMount: function() {
    this.geolocation = new Geolocation();
    this.geolocation.getCurrentLocation().then((location) => {
      this.setState({ currentLocation: location });
    }).catch((error) => console.log(error));
  },

  render: function () {
    return (
      <View>
        <Image source={require('image!senaatti1')} style={baseStyles.backgroundImage} resizeMode='cover' />
        <Logo/>
        <Text style={baseStyles.goText}>What is your frequent flyer number?</Text>
        <View style={{flexDirection: 'row', width: 200, height: 30, padding: 0, borderBottomWidth: 1, marginTop: 30, marginLeft: 60, borderBottomColor: "#ffffff"}}>
          <TextInput
            placeholder="Number"
            placeholderTextColor="#ffffff"
            style={[baseStyles.input, { flex: 0.8 }]}
            onChangeText={(text) => this.setState({bookingNumber: text})}
            value={this.state.bookingNumber}
            onSubmitEditing={this.submitJourney}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            style={[
              baseStyles.button,
              { marginTop: 50, marginLeft: 75 }
            ]}
            onPress={this.submitJourney}
          >
            Find me a route!
          </Button>
        </View>
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
    fetch('http://api.steward.dev/customers', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "member_number": Number(this.state.bookingNumber)})
    }).then((response) => {
      return response.text();
    }).then((responseText) => {
      var body = JSON.parse(responseText);
      console.log(body)
      this.props.onForward(body);
    }).catch((error) => {
      console.log(error)
      AlertIOS.alert("Error error");
    });
  }
});
