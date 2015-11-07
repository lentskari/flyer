var React = require('react-native');

var {
  TouchableOpacity,
  Text
} = React;

module.exports = React.createClass({
  render: function () {
    console.log(this.props)
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
})
