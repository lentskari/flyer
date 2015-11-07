var React = require('react-native');
var baseStyles = require('./styles/base');
var Logo = require('./logo_view');

var {
  View,
  Text,
  Image,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View>
        <Logo />
        <Image source={require('image!clouds')} style={baseStyles.backgroundImage} resizeMode='cover' />
        <View style={baseStyles.scene}>
          <Text>Journey view</Text>
        </View>
      </View>
    );
  }
});
