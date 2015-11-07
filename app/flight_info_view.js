
var React = require('react-native');

var {
  View,
  Text,
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20
      }}
      >
        <Text style={{}}>{this.props.duration}</Text>
        <Text>Flight {this.props.flightNumber}</Text>
      </View>
    );
  }
});
