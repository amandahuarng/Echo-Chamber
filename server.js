// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// listen for requests :)
app.listen(8888, function () {
  console.log('Your app is listening on port 8888');
});
