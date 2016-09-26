var express= require('express');
var app= express();
var ejs= require('ejs');
var layout= require('express-ejs-layouts');
var sroutes= require('./config/static-routes')

app.set('view engine', 'ejs');

app.use(sroutes);

app.set('port', process.env.PORT || 8085);
var server = app.listen(app.get('port'), function() {
    console.log('> Server up and listening on port ' + server.address().port);
});

module.exports = app;
