var Gpio = require('onoff').Gpio,
  led = new Gpio(17, 'out'),
  button = new Gpio(18, 'in', 'up');
console.log('test') ;
button.watch(function(err, value) {
  led.writeSync(value);
  console.log('test');
});
