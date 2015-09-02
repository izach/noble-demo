/**
 * Created by isaacherrera on 8/26/15.
 */

// http://stackoverflow.com/questions/20416218/understanding-ibeacon-distancing/20434019#20434019
// function for calculating the ratio between the rssi signal and measured power and then add some decay for signal fall off
module.exports = function(rssi){
    /*
     The distance estimate provided by iOS is based on the ratio of the iBeacon signal strength (rssi)
     over the calibrated transmitter power (txPower).
     The txPower is the known measured signal strength in rssi at 1 meter away.
     Each iBeacon must be calibrated with this txPower value to allow accurate distance estimates.
     */
    var txPower = -62; //hard coded power value. Usually ranges between -59 to -65
    // 59, 65,60
    if (rssi == 0) {
        return -1.0; // if we cannot determine accuracy, return -1.
    }
    // Note that the term "accuracy" here is iOS speak for distance in meters.
    // This formula isn't perfect, but it roughly approximates what iOS does.
    var ratio = rssi*1.0/txPower;
    if (ratio < 1.0) {
        return Math.pow(ratio,10);
    }
    else {
        var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;
        return distance;
    }

};