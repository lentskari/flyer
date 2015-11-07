var React = require('react-native');

var baseStyles = require('./app/styles/base');
var UberConnect = require('./app/uber_connect');
var InfoView = require('./app/info_view');
var MemberView = require('./app/member_view');
var Geolocation = require('./app/lib/geolocation');

SCENES = ["infoview", "memberview", "journey"];

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var JourneyView = require('./app/journey_view')
var Logo = require('./app/logo_view')

var flyer = React.createClass({
  getInitialState: function() {
    return {
      myLocation: {}
    };
  },

  renderScene: function (route, nav) {
    var Component = null;
    console.log("ROUTE", route.name);
    switch (route.name) {
      case "infoview":
        Component = InfoView;
        break;
      case "journey":
        Component = JourneyView;
        break;
      case "memberview":
        Component = MemberView
        break;
      default:
        Component = View
    }

    return (
      <View>
        <Component
          props={route.props}
          navigator={nav}
          route={route}
          onForward={(nextProps) => {
            var nextIndex = route.index + 1;
            nav.push({
              name: SCENES[nextIndex],
              index: nextIndex,
              props: nextProps
            })
          }}
          onBack={() => {
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
