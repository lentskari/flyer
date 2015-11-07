var React = require('react-native');
var _ = require('underscore');

var Button = require('react-native-button');
var JourneyView = require('./journey_view');

var baseStyles = require('./styles/base');

var Geolocation = require('./lib/geolocation');

var {
  View,
  Text,
  TextInput,
  AlertIOS
  Image
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      fromText: "Current location",
      toText: "",
      bookingNumber: "",
      currentLocation: {}
    };
  },

  componentDidMount: function() {
    this.geolocation = new Geolocation();
    this.geolocation.getCurrentLocation().then((location) => {
      this.setState({ currentLocation: location });
    }).catch((error) => console.log(error));
  },

  render: function() {
    return <View>
      <View style={baseStyles.backgroundWrapper}>
        <Image source={require('image!senaatti')} style={baseStyles.backgroundImage} resizeMode='cover' />
      </View>
      <View style={{flexDirection: 'row', height: 60, padding: 10}}>
        <Text style={{marginRight: 4}}>From:</Text>
        <TextInput
          clearTextOnFocus={true}
          style={[baseStyles.input, { flex: 0.8 }]}
          onChangeText={(text) => this.setState({fromText: text})}
          value={this.state.fromText}/>
      </View>
      <View style={{flexDirection: 'row', height: 60, padding: 10}}>
        <Text style={{marginRight: 4}}>To:</Text>
        <TextInput
          style={[baseStyles.input, { flex: 0.8 }]}
          onChangeText={(text) => this.setState({toText: text})}
          value={this.state.toText}/>
      </View>
      <View style={{flexDirection: 'row', height: 60, padding: 10}}>
        <Text style={{marginRight: 4}}>Booking Number:</Text>
        <TextInput
          style={[baseStyles.input, { flex: 0.8 }]}
          onChangeText={(text) => this.setState({bookingNumber: text})}
          value={this.state.bookingNumber}
          returnKeyType="done"
          onSubmitEditing={this.submitJourney}/>
      </View>
    </View>;
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
      this.navigateToJourneyView(body);
    }).catch((error) => {
      AlertIOS.alert("Error error");
    });
  },

  navigateToJourneyView: function(customer) {
    console.log(customer);
    this.props.onForward();
    this.props.navigator.push({
      title: "Your route",
      component: JourneyView
    });
  }

});
