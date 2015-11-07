var React = require('react-native');
var baseStyles = require('./styles/base');

var {
  Text,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <Text style={baseStyles.logo}>gogo</Text>
    );
  }
});

