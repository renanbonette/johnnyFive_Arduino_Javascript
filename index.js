const express = require('express')
const five = require('johnny-five')
const bodyParser = require('body-parser');

const app = express()
const server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});
app.post('/', function(req, res){
  console.log(req.body);
});

five.Board().on("ready", function() {
  const led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });

  this.repl.inject({
    led: led
  });

  led.on();
  led.color("#FF0000");

  led.blink(1000);

  let setLedState = function(color){
    console.log(color);
  }
  setLedState("#FF00FF");
  
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);