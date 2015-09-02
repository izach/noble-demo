/**
 * Created by isaacherrera on 8/24/15.
 */
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var calculateDistance = require("./utils");
var KalmanFilter = require("../server/KalmanFilter.js");
var io = require('socket.io')(http, {
    allowUpgrades: true,
    transports: ['websocket'],// , 'flashsocket', 'polling'
    'log level': 1,
    'pingTimeout': 1000 * 80,
    'pingInterval': 1000 * 25
});
/*
    Scanner beacons
 */
var scanner = io.of('/scanner');

scanner.on('connection', function(socket) {

    console.log('Scanner Connected');

    socket.on('deviceData', function(msg) {
        //received message from scanner
        //do some processing here
        //console.log("Message: " + JSON.stringify(msg));

        var rssiFiltered = KalmanFilter.filter(msg.rssi, msg.localName);
        var distance = calculateDistance( msg.rssi );
        var distanceFiltered = calculateDistance( rssiFiltered );

        msg["distance"] = distance;
        msg["distanceFiltered"] = distanceFiltered;
        msg["rssiFiltered"] = rssiFiltered;
        //console.log( msg );
        console.log( "rssiRaw:" + msg.rssi + ", filtered:" + msg.rssiFiltered);
        scannerClient.emit('message', msg);
    });

    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });
});



/*
    Pushing beacons location
 */
var scannerClient = io.of('/client');

scannerClient.on('connection', function(socket) {

    console.log('Scanner Client Connected');

    /*socket.on('deviceData', function(msg) {
        //received message from scanner
        //do some processing here
        //console.log("Message: " + JSON.stringify(msg));

        var distance = calculateDistance( msg.rssi );
        msg["distance"] = distance;
        console.log( msg );
    });*/

    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
