var React = require('react-native');
var baseStyles = require('./styles/base');
var env = require('./env.js');

var {
  View,
  Text,
  LinkingIOS
} = React;

var Button = require('react-native-button');

module.exports = React.createClass({
  componentDidMount: function() {
    LinkingIOS.addEventListener('url', this.handleRedirect);
  },

  render: function() {
    return <View style={baseStyles.center}>
      <Button onPress={this.loginToUber}>
        <Text>Login to Uber</Text>
      </Button>
    </View>;
  },

  loginToUber: function() {
    var type = "code";
    var clientId  = env.uberClientId;
    var scopes = "profile request";
    var url = `https://login.uber.com/oauth/v2/authorize?response_type=${type}&client_id=${clientId}&scopes=${scopes}`;
    LinkingIOS.openURL(url);
  },

  handleRedirect: function() {
    console.log("Handling redirect");
    console.log(arguments);
    LinkingIOS.removeEventListener('url', this.handleRedirect);
  }
});
