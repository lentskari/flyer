
var React = require('react-native');

var {
  View,
  Text,
  Image
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
      }}
      >
        <Image style={{
          width: 27,
          height: 27,
          resizeMode: Image.resizeMode.stretch}}
        source={require('image!plane_icon')}/>
        <Text style={{marginTop: 2, marginLeft: 35 }}>{this.props.duration}</Text>
        <Text style={{marginTop: 2}}>Flight {this.props.flightNumber}</Text>
      </View>
    );
  }
});
