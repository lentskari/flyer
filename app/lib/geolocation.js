var Promise = require("bluebird");
var _ = require("underscore");

class Geolocation {
  constructor() {
    this.locationWatches = [];
  }

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

  watchLocation(cb) {
    var throttledCallback = _.throttle(cb, 500);
    var watchId = navigator.geolocation.watchPosition((lastPosition) => {
      var position = lastPosition.coords;
      throttledCallback({ lat: position.latitude, lon: position.longitude });
    });
    this.locationWatches.push(watchId);
  }

  unregisterLocationWatches() {
    locationWatches.each((w) => navigator.geolocation.clearWatch(w));
  }
}

module.exports = Geolocation;
