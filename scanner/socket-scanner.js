/**
 * Created by isaacherrera on 8/24/15.
 */
var noble = require('noble');

//replace localhost with your server's IP;
var socket = require('socket.io-client')('http://10.7.21.27/scanner');

//replace with your hardware address
var addressToTrack = '7c669d9b2dda';

socket.on('connect', function(){
    console.log('connected to server');
});

socket.on('connect_error', function(error){
    console.log('connected to server' + error);
});

socket.on("event", function(data){
    console.log("Event:"  + data);
});

socket.on("disconnect", function(){
    console.log('disconnected from server');
});

noble.on('discover', function(peripheral){

    //if(peripheral.uuid == addressToTrack){
        console.log('deviceData', {mac: peripheral.uuid, rssi:peripheral.rssi});
        socket.emit('deviceData', {mac: peripheral.uuid, rssi:peripheral.rssi});
    //}
});

//noble.startScanning([], true); //allows duplicates while scanning

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