var React = require('react-native');

var baseStyles = require('./app/styles/base');
var UberConnect = require('./app/uber_connect');
var InfoView = require('./app/info_view');
var Geolocation = require('./app/lib/geolocation');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
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
    this.geolocation.watchLocation((location) => {
      this.setState({ myLocation: location });
    });
  },

  componentWillUnmount: function() {
    this.geolocation.unregisterLocationWatches();
  },

  render: function() {
    return <NavigatorIOS
      style={{flex: 1}}
      initialRoute={{
        component: InfoView,
        title: "Input your information"
      }} />;
  },

  getCurrentLocation: function() {
    this.geolocation.getCurrentPosition().then((position) => {
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
