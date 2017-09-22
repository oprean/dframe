var gpio = require('rpi-gpio');
 
var pin   = 12;
var delay = 500;
var count = 0;
var max   = 3;

gpio.setup(pin, gpio.DIR_OUT, on);
//gpio.setMode(gpio.MODE_BCM);
 
function on() {
    if (count >= max) {
        gpio.destroy(function() {
            console.log('Closed pins, now exit');
        });
        return;
    }
 
    setTimeout(function() {
        gpio.write(pin, 1, off);
        count += 1;
    }, delay);
}
 
function off() {
    setTimeout(function() {
        gpio.write(pin, 0, on);
    }, delay);
}
