#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
var cs = require('./constants.js');
var cfg = require('./config.js');

if (cfg.OS == cs.OS_RPI) {
    var Gpio = require('onoff').Gpio;
    var led = new Gpio(17, 'out');
    var ledState = 1;
    var button = new Gpio(18, 'in', 'up');

    button.watch(function(err, value) {
      led.writeSync(value);
    });
}

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(cfg.PORT, function() {
    console.log((new Date()) + ' Server is listening on port '+cfg.PORT);
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}
 
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('dframe-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    processMsg(connection);
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function processMsg(connection) {
    connection.on('message', function(message) {
        cmd = message.utf8Data;
        switch (cmd) {
            case cs.CMD_PING:
                connection.sendUTF('pong');
                console.log('pong');
                break;
            case cs.CMD_NEW_PIC:
		var picId = Math.floor((Math.random() * 10) + 1);
                connection.sendUTF(picId.toString());
                console.log(cmd + ' executed!');
                break;
            case cs.CMD_TOGGLE:
                connection.sendUTF(cmd + ' executed!');
                console.log(cmd + ' executed!');
                ledState = ledState==1?0:1;
                led.writeSync(ledState);
                break;
            default:
                connection.sendUTF(cmd + ' bad command or operator!');
                console.log(cmd + ' bad command or operator!');
                break;
        }
    });
}
