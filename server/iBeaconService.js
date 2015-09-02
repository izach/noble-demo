/**
 * Created by isaacherrera on 9/1/15.
 */
var KalmanFilter = require("./KalmanFilter");


var iBeaconService = (function () {
    "use strict";

    //this.hash = uuid + ":" + major + ":" + minor;

    var calculateDistanceFrom = function (rssi, existingBeacon) {
        var filteredRssi = KalmanFilter.filter(rssi, hash);

        var distanceInMetres = distanceFrom(filteredRssi, txPower);

        if (existingBeacon != null) {
            distanceInMetres = filteredDistance(distanceInMetres, existingBeacon.distanceInMetres());
        }

        this.distanceInMetres = distanceInMetres;
        this.lastRssi = filteredRssi;
        this.lastReport = System.currentTimeMillis();
    };

    var distanceFrom = function (rssi, txPower) {
        if (rssi == 0) {
            return -1;
        }

        var ratio = rssi / txPower;

        if (ratio < 1) {
            return Math.pow(ratio, 10);
        }
        else {
            return 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
        }
    };

    return {
        calculateDistanceFrom: calculateDistanceFrom
    };
});

module.exports = iBeaconService;