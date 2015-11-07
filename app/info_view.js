var React = require('react-native');
var _ = require('underscore');

var Button = require('react-native-button');
var JourneyView = require('./journey_view');

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
      fromText: "Current location",
      toText: "",
      bookingNumber: "",
      currentLocation: {},
      address: ""
    };
  },

  componentDidMount: function() {
    this.geolocation = new Geolocation();
    this.geolocation.getCurrentLocation().then((location) => {
      this.setState({ currentLocation: location });
    }).catch((error) => console.log(error));
  },

  render: function() {
    return <View style={{}}>
      <Image source={require('image!eiffel-tower')} style={baseStyles.backgroundImage} resizeMode='cover' />
      <Logo />
      <Text style={baseStyles.goText}>I want to go to</Text>
      <View style={{flexDirection: 'row', height: 30, padding: 0, borderBottomWidth: 1, marginLeft: 60, marginRight: 60, marginBottom: 210, borderBottomColor: "#ffffff"}}>
        <TextInput
          placeholder="Destination"
          placeholderTextColor="#ffffff"
          style={[baseStyles.input, { flex: 0.8 }]}
          onChangeText={(text) => this.setState({address: text})}
          value={this.state.address}
          onSubmitEditing={() => {this.props.onForward({address: this.state.address})}}
        />
      </View>
      <Text style={{
        position: 'absolute',
        color: "#ffffff",
        marginLeft: 70,
        bottom: 0
      }}>
        Change my current location!
      </Text>
    </View>;
  },

  navigateToJourneyView: function(customer) {
    this.props.onForward();
  }

});
