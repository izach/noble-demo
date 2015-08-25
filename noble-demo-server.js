/**
 * Created by isaacherrera on 8/24/15.
 */

console.log('Init app...');
var noble = require('noble');
//console.log('Start scanning..');
//noble.startScanning(); // any service UUID, no duplicates


/*noble.startScanning([], true); // any service UUID, allow duplicates


var serviceUUIDs = ["<service UUID 1>", ...]; // default: [] => all
var allowDuplicates = <false|true>; // default: false

noble.startScanning(serviceUUIDs, allowDuplicates[, callback(error)]); // particular UUID's
    */
console.log('on discover...');
noble.on('discover', function(peripheral) {

    var macAddress = peripheral.uuid;
    var rss = peripheral.rssi;
    //var localName = advertisement.localName;
    //console.log('found device: ', macAddress, ' ', rss);
    console.log("Found device: " + peripheral );
    console.log( peripheral );
    //console.log('found device: ', macAddress, ' ', localName, ' ', rss);
});

noble.on('stateChange', function(state) {
    console.log("State: " + state);
    if (state === 'poweredOn') {
        console.log('Start scanning..');
        //noble.startScanning(['a495ff10c5b14b44b5121370f02d74de']);
        noble.startScanning(); // any service UUID, no duplicates
    } else {
        console.log('Stop scanning..');
        noble.stopScanning();
    }
});