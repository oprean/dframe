#!/usr/bin/env node
const cs = require('./constants.js');
const cfg = require('./config.js');

const Picasa = require('picasa')
const picasa = new Picasa()

const config = {
  clientId     : cfg.GOOGLE_CLIENT_ID,
  redirectURI  : cfg.GOOGLE_REDIRECT_URI,
  clientSecret : cfg.GOOGLE_CLIENT_SECRET
}

var googleAccessToken = null;
var googleAlbums = [];

picasa.renewAccessToken(config, cfg.GOOGLE_API_REFRESH_TOKEN, (error, accessToken) => {
  googleAccessToken = accessToken;
  var options = {};
    picasa.getAlbums(accessToken, options,  (error, albums) => {
        googleAlbums = albums;
    });
})

function getNewPic(connection) {
    var album = Math.floor(Math.random() * googleAlbums.length);
    album = googleAlbums[album];

    var options = {
        imgMax: 1600,
        albumId : album.id
    }
    picasa.getPhotos(googleAccessToken, options, (error, photos) => {
        if (photos) {
            var photo = Math.floor(Math.random() * photos.length);
            photo = photos[photo];
            photo.album_title = album.title;
            var response = {
                cmd:cs.CMD_NEW_PIC,
                album: album, 
                photo: photo
            };
            connection.sendUTF(JSON.stringify(response));
            console.log(cmd + ': '+photo.content.src);
        }
    })
}

var WebSocketServer = require('websocket').server;
var http = require('http');

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
    processCommand(connection);
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function processCommand(connection) {
    connection.on('message', function(message) {
        cmd = message.utf8Data;
        switch (cmd) {
            case cs.CMD_PING:
                connection.sendUTF('pong');
                console.log('pong');
                break;
            case cs.CMD_NEW_PIC:
                getNewPic(connection);
                break;
            case cs.CMD_TOGGLE:
                if (cfg.OS == cs.OS_RPI) {
                    connection.sendUTF(cmd + ' executed!');
                    console.log(cmd + ' executed!');
                    ledState = ledState==1?0:1;
                    led.writeSync(ledState);                    
                }
                break;
            default:
                connection.sendUTF(cmd + ' bad command or operator!');
                console.log(cmd + ' bad command or operator!');
                break;
        }
    });
}
