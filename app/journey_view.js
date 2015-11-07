var React = require('react-native');
var moment = require('moment');
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
    var props = this.props.route.props;
    var flight = props.next.flight
    var duration = moment(flight.arrival_time).subtract(flight.departure_time).utc()
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
            <TimedLocation
              address={props.current_address}
              time={moment().format("hh:mm")}
            />
            <Orderables />
            <TimedLocation
              address={props.next.origin_airport.name}
              time={moment(props.next.flight.departure_time).utc().format("hh:mm")}
            />
            <FlightInfo
              flightNumber="AY 880"
              duration={`${duration.format('h')}h ${duration.format('mm')}min `} />
            <TimedLocation
              address={props.next.destination_airport.name}
              time={moment(props.next.flight.arrival_time).utc().format("hh:mm")}
            />
            <Orderables />
            <TimedLocation address={props.final_address} time="" />
          </View>
        </View>
      </View>
    );
  }
});
