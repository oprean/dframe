const cs = require('../constants.js');
const cfg = require('../config.js');
const Gpio = require('onoff').Gpio;

class ServerHome {
    constructor() {
        var led = new Gpio(17, 'out');
        var ledState = 1;
        var button = new Gpio(18, 'in', 'up');

        button.watch(function(err, value) {
          led.writeSync(value);
        });
    }       
}

module.exports = ServerHome