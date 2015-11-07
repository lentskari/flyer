var React = require('react-native');

var {
  View,
  TextInput,
  Text
} = React;

styles = require("./styles/base")

module.exports = React.createClass({
  getInitialState: function () {
    return {
      from: "",
      to: ""
    }
  },
  render: function () {
    return (
      <View style={styles.inputForm}>
        <Text>From</Text>
        <TextInput
          style={styles.input}
          onChangeText={(from) => this.setState({from})}
          value={this.state.text}
        />
        <Text>To</Text>
        <TextInput
          style={styles.input}
          onChangeText={(to) => this.setState({to})}
          value={this.state.text}
        />
      </View>
    );
  }
});

