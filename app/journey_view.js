var React = require('react-native');
var baseStyles = require('./styles/base');

var {
  View,
  Text
} = React;

module.exports = React.createClass({
  render: function() {
    return <View style={baseStyles.scene}>
      <Text>Journey view</Text>
    </View>;
  }
});
