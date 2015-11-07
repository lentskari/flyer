var React = require('react-native');

var baseStyles = require('./app/styles/base');
var UberConnect = require('./app/uber_connect');
var InfoView = require('./app/info_view');
var Geolocation = require('./app/lib/geolocation');

SCENES = ["infoview", "journey"]

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var flyer = React.createClass({
  getInitialState: function() {
    return {
      myLocation: {}
    };
  },

  componentDidMount: function() {
    this.geolocation = new Geolocation();
    this.getCurrentLocation();
    this.geolocation.watchLocation((location) => {
      this.setState({ myLocation: location });
    });
  },

  componentWillUnmount: function() {
    this.geolocation.unregisterLocationWatches();
  },

  renderScene: function (route, nav) {
    var Component = null;
    switch (route.id) {
      case "journey":
        Component = JourneyView;
      default:
        Component = InfoView;
    }
    return (
      <View>
        <Component
          navigator={nav}
          route={route}
          onForward={() => {
            console.log("FORWARD")
            var nextIndex = route.index + 1
            nav.push({
              name: SCENES[nextIndex],
              index: nextIndex,
            })
          }}
          onBack={() => {
            console.log("BACKWARD", route.index, route.name)
            if (route.index > 0) {
              nav.pop()
            }
          }}
        />
      </View>
    );
  },
  render: function() {
    return <Navigator
      style={{flex: 1}}
      initialRoute={{
        component: InfoView,
        index: 0,
        name: SCENES[0],
      }}
      renderScene={this.renderScene}
      configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig
        }
        return Navigator.SceneConfigs.FloatFromRight
        }}
    />;
  },

  getCurrentLocation: function() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.setState({ myLocation: position });
    }).catch((error) => {
      console.log("ERROR", error);
    });
  }
});

var styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('flyer', () => flyer);
