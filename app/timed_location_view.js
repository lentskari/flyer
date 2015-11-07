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
        alignItems: 'flex-start',
      }}>
        <View style={{width: 40, marginRight: 5}}>
          <Text style={{fontSize: 14, fontFamily: 'Avenir-Medium'}}>{this.props.time}</Text>
        </View>
        <View style={{width: 8, marginRight: 8}}>
          <Text style={{fontFamily: 'Avenir-Medium'}}>o</Text>
        </View>
        <View style={{width: 200}}>
          <Text style={{fontSize: 18, fontFamily: 'Avenir-Medium'}}>{this.props.address}</Text>
        </View>
      </View>
    );
  }
});
