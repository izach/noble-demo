/**
 * Created by isaacherrera on 8/24/15.
 */

console.log('Init app...');
var noble = require('noble');
console.log('Start scanning..');
noble.startScanning(); // any service UUID, no duplicates


/*noble.startScanning([], true); // any service UUID, allow duplicates


var serviceUUIDs = ["<service UUID 1>", ...]; // default: [] => all
var allowDuplicates = <false|true>; // default: false

noble.startScanning(serviceUUIDs, allowDuplicates[, callback(error)]); // particular UUID's
    */
console.log('on discover...');
noble.on('discover', function(peripheral) {

    var macAddress = peripheral.uuid;
    var rss = peripheral.rssi;
    var localName = advertisement.localName;
    console.log('found device: ', macAdress, ' ', localName, ' ', rss);
});