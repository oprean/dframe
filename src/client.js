#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
var cs = require('./Constants.js');
var cfg = require('./config.js');
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('dframe-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
        connection.close();
    });
    
    if (connection.connected) {
        connection.sendUTF(JSON.stringify({text:argv.c, params:argv.p}));
    }    
});
 
client.connect('ws://'+cfg.IP+':'+cfg.PORT+'/', cfg.PROTOCOL);
// this is the command format:
// \dframe>node src\client.js -c switch-module -p 0