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
    flex: 1,
    position: 'absolute',
    top: 0
  },
  infoView: {
    backgroundColor: '#dddddd',
    padding: 10,
    paddingTop: 74,
    flex: 1
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  input: {
    height: 30,
    borderWidth: 0,
    borderColor: "#ffffff",
    color: "#ffffff",
  },
  goText: {
    fontFamily: 'Avenir',
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "800",
    paddingLeft: 60
  },
  logo: {
    paddingTop: 20,
    paddingLeft: 90,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Avenir',
    fontSize: 60,
    fontWeight: "900",
    color: "#ffffff"
  }
});
