var React = require('react-native');
var baseStyles = require('./styles/base');

var {
  View,
  Text,
  Image,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View>
        <View style={baseStyles.backgroundWrapper}>
          <Image source={require('image!clouds')} style={baseStyles.backgroundImage} resizeMode='cover' />
        </View>
        <View style={baseStyles.scene}>
          <Text>Journey view</Text>
        </View>
      </View>
    );
  }
});
