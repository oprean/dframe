#!/usr/bin/env node
const cs = require('../constants.js');
const cfg = require('../config.js');

const Configs = require('./server.configs.js');
const configs = new Configs();

const Photos = require('./server.photos.js');
const photos = new Photos();

const Weather = require('./server.weather.js');
const weather = new Weather();

if (cfg.OS == cs.OS_RPI) {
    const Home = require('./server.home.js');
    const home = new Home();
}

var WebSocketServer = require('websocket').server;
var http = require('http');

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
    
    var connection = request.accept(cfg.PROTOCOL, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    processCommand(connection);
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function processCommand(connection) {
    connection.on('message', function(message) {
        var command = null;
        try {
            command = JSON.parse(message.utf8Data);
        } catch(err){
            console.log('Invalid command! Command: '+ message.utf8Data);
        };
        
        if (command == null) return;
        console.log('Processing cmd: '+command.text);        
        switch (command.text) {
            case cs.CMD_PING:
                connection.sendUTF('pong');
                console.log('pong');
                break;
                
            case cs.CMD_NEW_PIC:
                photos.getNewPic(connection);
                break;
                
            case cs.CMD_UPDATE_WEATHER:
                weather.getWeatherUpdate(connection);
                break;
                
            case cs.CMD_GET_CONFIGS:
                configs.getConfig(connection);
                break;
                            
            case cs.CMD_SWITCH_MODULE:
                var moduleID = command.params;
                var response = {
                    cmd:cs.CMD_SWITCH_MODULE,
                    moduleID: moduleID
                };
                wsServer.broadcast(JSON.stringify(response));
                console.log(command.text + ': '+moduleID);
                break;
                
            default:
                connection.sendUTF(command.text + ' bad command or operator!');
                console.log(command.text + ' bad command or operator!');
                break;
        }
    });
}
