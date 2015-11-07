var Promise = require("bluebird");

class Geolocation {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (initialPosition) => {
          var position = initialPosition.coords;
          resolve({ lat: position.latitude, lon: position.longitude});
        },
        (error) => reject(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    });
  }
}

module.exports = Geolocation;
