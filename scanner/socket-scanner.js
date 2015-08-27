/**
 * Created by isaacherrera on 8/24/15.
 */
var noble = require('noble');

//replace localhost with your server's IP;
var socket = require('socket.io-client')('http://10.7.21.27:3000/scanner',{
    'forceNew': true,
    'sync disconnect on unload': true,
    reconnect: false,
    transports: ['websocket'],
    query: {
        bestvid: "___" + "asafw2" + "___",//bestId
        client_id: 1,//clientId,
        client_name: 2,//bestId,
        token: "12qw",//token,
        platform: "12qfsv34" //platform
    }
});

//replace with your hardware address
//var addressToTrack = '7c669d9b2dda';
//var addressToTrack = 'c2ab96ddc4ed'; // ice not found
var addressToTrack = 'f94b9286781c';

socket.on('connect', function(){
    console.log('connected to server successfully');
});

socket.on('connect_error', function(error){
    console.log(error);
});

socket.on("event", function(data){
    console.log("Event:"  + data);
});

socket.on("disconnect", function(){
    console.log('disconnected from server');
});

noble.on('discover', function(peripheral){

    console.log("Device found: " + peripheral.uuid);
    if(peripheral.uuid == addressToTrack){
        console.log('deviceData', { localName: peripheral.advertisement.localName, mac: peripheral.uuid, rssi:peripheral.rssi});
        socket.emit('deviceData', { localName: peripheral.advertisement.localName, mac: peripheral.uuid, rssi:peripheral.rssi});
    }
});

//noble.startScanning([], true); //allows duplicates while scanning

noble.on('stateChange', function(state) {
    console.log("State: " + state);
    if (state === 'poweredOn') {
        console.log('Start scanning..');
        //noble.startScanning(['a495ff10c5b14b44b5121370f02d74de']);
        //noble.startScanning(); // any service UUID, no duplicates
        noble.startScanning([],true); // //allows duplicates while scanning
    } else {
        console.log('Stop scanning..');
        noble.stopScanning();
    }
});