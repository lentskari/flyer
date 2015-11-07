var React = require('react-native');

var Button = require('react-native-button');
var JourneyView = require('./journey_view');

var baseStyles = require('./styles/base');

var {
  View,
  Text
} = React;

module.exports = React.createClass({
  render: function() {
    return <View style={baseStyles.scene}>
      <Text>Info view</Text>
      <Button onPress={this.onCalculateRoute}>Calculate Route</Button>
    </View>;
  },

  onCalculateRoute: function() {
    this.props.navigator.push({
      title: "Your route",
      component: JourneyView
    });
  }

});
