/**
 * Created by isaacherrera on 8/24/15.
 */
var noble = require('noble');

//replace localhost with your server's IP;
var socket = require('socket.io-client')('http://10.7.21.20/scanner');

//replace with your hardware address
var addressToTrack = '7c669d9b2dda';

socket.on('connect', function(){
    console.log('connected to server');
});

noble.on('discover', function(peripheral){
    if(peripheral.uuid == addressToTrack){
        console.log('deviceData', {mac: peripheral.uuid, rssi:peripheral.rssi});
        socket.emit('deviceData', {mac: peripheral.uuid, rssi:peripheral.rssi});
    }
});

noble.startScanning([], true); //allows duplicates while scanning