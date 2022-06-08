const ws = require("ws");
const express = require("express");

const axios = require('axios');

const expressServer = express()

expressServer.use(express.static('public'));

expressServer.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const config = {
  method: 'get',
  url: 'https://suncrypto.in/socket/market.php',
  headers: {}
};


const wsServer = new ws.Server({
  port: 8080,
  host: "localhost",
  path : "/"
})

expressServer.get('/', (req, res) => {
  res.send('Hello World!');
});


wsServer.on("connection", (ws) => {

  setInterval(function getmarket() {
    axios(config)
    .then(function (response) {
        ws.send(response.data)
    })
    .catch(function (error) {
        console.log(error.message);
    });
  }, 1000);

})

