/**
 * Created by isaacherrera on 8/24/15.
 */
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    allowUpgrades: true,
    transports: ['websocket'],// , 'flashsocket', 'polling'
    'log level': 1,
    'pingTimeout': 1000 * 80,
    'pingInterval': 1000 * 25
});

var scanner = io.of('/scanner');

scanner.on('connection', function(socket) {

    console.log('Scanner Connected');

    socket.on('message', function(msg) {
        //received message from scanner
        //do some processing here
        //console.log("Message: " + JSON.stringify(msg));
        console.log( msg );
    });

    socket.on('event', function(msg) {
        //received message from scanner
        //do some processing here
        //console.log("Message: " + JSON.stringify(msg));
        console.log( msg );
    });

    socket.on('deviceData', function(msg) {
        //received message from scanner
        //do some processing here
        //console.log("Message: " + JSON.stringify(msg));
        console.log( msg );
    });

    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});