var React = require('react-native');
var baseStyles = require('./styles/base');
var Logo = require('./logo_view');
var Icon = require('./icon_view');

var {
  View,
  Text,
  Image,
} = React;

var TimedLocation = require('./timed_location_view')
var Orderables = require('./orderables_view')
var FlightInfo = require('./flight_info_view')

module.exports = React.createClass({
  render: function() {
    return (
      <View>
        <Image source={require('image!clouds')} style={baseStyles.backgroundImage} resizeMode='cover' />
        <Logo style={{color: '#e92e2f'}} />
        <View style={{
          flexDirection: 'row',
          marginTop: 121,
          marginLeft: 30,
          marginRight: 30,
        }}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TimedLocation address="5 Avenue Anatole, Paris" time="12.00" />
            <Orderables />
            <TimedLocation address="Paris Charles de Gaulle Airport" time="12.20" />
            <FlightInfo flightNumber="AY 880" duration="2h 55min" />
            <TimedLocation address="Vantaa, Helsinki Vantaa Airport" time="12.20" />
            <Orderables />
            <TimedLocation address="Senaatintori, Helsinki" time="12.20" />
          </View>
        </View>
      </View>
    );
  }
});
