/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var React = require('react-native');

var UberConnect = require('./app/uber_connect');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var flyer = React.createClass({
  render: function() {
    return <UberConnect />;
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
