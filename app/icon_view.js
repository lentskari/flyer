var React = require('react-native');

var {Image} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <Image source={require(this.props.image)}/>
    );
  }
})
