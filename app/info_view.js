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
    return <View style={baseStyles.scene}>
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
      AlertIOS.alert("Current locatiot not found yet :(");
      return;
    }
    this.props.navigator.push({
      title: "Your route",
      component: JourneyView
    });
  }

});
