var React = require('react-native');

var Geolocation = require('./lib/geolocation');

var {
  View,
  Text,
  Image,
  AlertIOS
} = React;

var Button = require('react-native-button');

module.exports = React.createClass({
  getInitialState: function() {
    return { uber: false };
  },

  renderOrdelable: function() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
          }}
        >
          <Text style={{color: "#e92e2f", }}>Want a transportation?</Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 5,
          paddingBottom: 20
        }}
        >
          <View>
            <Button onPress={this.uberSelected}>
              <Image style={{width: 52, marginRight: 5}} source={require('image!uber_button1')}/>
            </Button>
          </View>
          <View>
            <Button onPress={this.alertComing}>
              <Image style={{width: 52, marginRight: 5}} source={require('image!bus_button1')}/>
            </Button>
          </View>
          <View>
            <Button onPress={this.alertComing}>
              <Image style={{width: 52, marginRight: 5}} source={require('image!taxi_button1')}/>
            </Button>
          </View>
          <View>
            <Button onPress={this.alertComing}>
              <Image style={{width: 52}} source={require('image!car_button1')}/>
            </Button>
          </View>
        </View>
      </View>
    );
  },

  render: function() {
    var orderedUber = this.state.uber;
    if (orderedUber) {
      return <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
          }}
        >
          <Text style={{color: "#e92e2f", }}>Uber ordered!</Text>
        </View>
      </View>;
    } else {
      return this.renderOrdelable();
    }
  },

  uberSelected: function() {
    new Geolocation().getCurrentLocation().then((location) => {
      console.log(this.props.originAirport);
      return fetch('http://api.steward.dev/uber/ride', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_lat: location.lat,
          start_lon: location.lon,
          end_lat: this.props.originAirport.latitude,
          end_lon: this.props.originAirport.longitude
        })
      }).then((response) => {
        return response.text();
      }).then((uberResp) => {
        this.setState({uber: uberResp});
      });
    }).catch((error) => console.log(error));
  },

  alertComing: function() {
    AlertIOS.alert("The transportation method coming soon!");
  }

});
