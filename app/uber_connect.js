var React = require('react-native');
var baseStyles = require('./styles/base');

var {
  View,
  Text,
} = React;

var Button = require('react-native-button');

module.exports = React.createClass({
  render: function() {
    return <View style={baseStyles.center}>
      <Button onPress={this.loginToUber}>
        <Text>Login to Uber</Text>
      </Button>
    </View>;
  },

  loginToUber: function() {
    console.log("UBer");
  }
});
