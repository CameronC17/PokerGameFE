
var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.listen(port, function() {
  console.log('> Server up and listening on port ' + port);

});

module.exports = app;
