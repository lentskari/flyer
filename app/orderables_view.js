var React = require('react-native');

var {
  View,
  Text,
  Image
} = React;

var Button = require('react-native-button');

module.exports = React.createClass({
  render: function() {
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
            <Button>
              <Image style={{width: 52, marginRight: 5}} source={require('image!uber_button1')}/>
            </Button>
          </View>
          <View>
            <Button>
              <Image style={{width: 52, marginRight: 5}} source={require('image!bus_button1')}/>
            </Button>
          </View>
          <View>
            <Button>
              <Image style={{width: 52, marginRight: 5}} source={require('image!taxi_button1')}/>
            </Button>
          </View>
          <View>
            <Button>
              <Image style={{width: 52}} source={require('image!car_button1')}/>
            </Button>
          </View>
        </View>
      </View>
    );
  }
});
