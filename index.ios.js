var React = require('react-native');

var baseStyles = require('./app/styles/base');
var UberConnect = require('./app/uber_connect');
var Geolocation = require('./app/lib/geolocation');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var flyer = React.createClass({
  getInitialState: function() {
    return {
      myLocation: {}
    };
  },

  componentDidMount: function() {
    this.geolocation = new Geolocation();
    this.getCurrentLocation();
  },

  render: function() {
    return <View style={baseStyles.center}>
      <Text>My location is: {this.state.myLocation.lat}:{this.state.myLocation.lon}</Text>
      <UberConnect />
    </View>;
  },

  getCurrentLocation: function() {
    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position);
      this.setState({ myLocation: position });
    }).catch((error) => {
      console.log("ERROR", error);
    });
  }
});

var styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('flyer', () => flyer);
