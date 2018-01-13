const express = require('express')
const five = require('johnny-five')
const bodyParser = require('body-parser');

const app = express()
const server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));

const board = new five.Board(); 
board.on('ready', onReady);
let led;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.post('/', function(req, res){  
  setLedColor(req.body.rgb_color, led);
  res.setHeader('Content-Type', 'application/json');
});

//Função que inicia a placa
function onReady(cor) {
  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });
};

function setLedColor(color, led){
  led.color(color);
  led.blink(1000);
}

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);