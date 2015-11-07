var Promise = require("bluebird");
var _ = require("underscore");

class Geolocation {
  constructor() {
    this.locationWatches = [];
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      var watchId = this.watchLocation((location) => {
        navigator.geolocation.clearWatch(watchId);
        resolve(location);
      });
    });
  }

  watchLocation(cb) {
    var throttledCallback = _.throttle(cb, 500);
    var watchId = navigator.geolocation.watchPosition((lastPosition) => {
      var position = lastPosition.coords;
      throttledCallback({ lat: position.latitude, lon: position.longitude });
    });
    this.locationWatches.push(watchId);
    return watchId;
  }

  unregisterLocationWatches() {
    locationWatches.each((w) => navigator.geolocation.clearWatch(w));
  }
}

module.exports = Geolocation;
