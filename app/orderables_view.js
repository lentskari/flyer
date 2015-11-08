var React = require('react-native');

var baseStyles = require('./styles/base');

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

  componentWillUnmount: function() {
    if(this.uberPollId) {
      clearInterval(this.uberPollId);
    }
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

  renderUber: function(uber) {
    var uberText = uber.driver ? "Driver is arriving now" : "Uber ordered!";
    return <View>
      <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom:10,
          }}>
          <View style={{
            flexDirection: 'row' }}>
            <Image style={{width: 27}} source={require('image!uber_icon')}/>
            <View style={{width: 8, marginTop: 2, marginLeft: 17, marginRight: 8}}>
              <Text style={{fontFamily: 'Avenir-Medium'}}>o</Text>
            </View>
            <Text style={{color: "#e92e2f", marginTop: 4}}>{uberText}</Text>
          </View>
          {this.renderUberDriver(uber)}
        </View>
    </View>;
  },

  renderUberDriver: function(uber) {
    if (!uber.driver || !uber.vehicle) return;
    console.log("Got uber and driver");
    console.log(uber);
    return <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 14, fontFamily: 'Avenir-Medium' }}>{uber.eta} min</Text>
      <View style={{ marginLeft: 26 }}>
        <View style={{
          flexDirection: 'row' }}>
          <Text style={{
            fontFamily: 'Avenir-Black',
            fontSize: 13,
            width: 100 }}>{uber.driver.name.toUpperCase()}</Text>
          <Text style={{
            fontFamily: 'Avenir-Black',
            fontSize: 13 }}>{uber.driver.rating} STARS</Text>
        </View>
        <View style={{
          marginTop: 5,
          flexDirection: 'row' }}>
          <Text style={{
            width: 100,
            fontFamily: 'Avenir-Black',
            fontSize: 13 }}>{`${uber.vehicle.make.toUpperCase()} ${uber.vehicle.model.toUpperCase()}`}</Text>
        <Text style={{
          fontFamily: 'Avenir-Black',
          fontSize: 13}}>{uber.vehicle.license_plate}</Text>
        </View>
      </View>
    </View>;
  },

  render: function() {
    var orderedUber = this.state.uber;
    if (orderedUber) {
      return this.renderUber(this.state.uber);
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
        this.setState({uber: JSON.parse(uberResp)});
        this.pollUberStatus();
      });
    }).catch((error) => console.log(error));
  },

  pollUberStatus: function() {
    this.uberPollId = setInterval(() => {
      if (!this.state.uber) return;
      var uber = this.state.uber;
      fetch(`http://api.steward.dev/uber/ride/${uber.request_id}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.text();
      }).then((uberResponse) => {
        var uberJson = JSON.parse(uberResponse);
        this.setState({uber: uberJson});
      }).catch((error) => console.log(error));
    }, 3000);
  },

  alertComing: function() {
    AlertIOS.alert("The transportation method coming soon!");
  }

});
