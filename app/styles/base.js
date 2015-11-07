var React = require('react-native');

var {
  StyleSheet
} = React;

module.exports = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scene: {
    padding: 10,
    paddingTop: 74,
    flex: 1
  },
  infoView: {
    backgroundColor: '#dddddd',
    padding: 10,
    paddingTop: 74,
    flex: 1
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  input: {
    padding: 4,
    width: 120,
    height: 30,
    borderWidth: 1
  }
});
