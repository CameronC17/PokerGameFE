var express= require('express');
var app= express();
var ejs= require('ejs');
var layout= require('express-ejs-layouts');
var sroutes= require('./config/static-routes');
var uroutes= require('./config/user-routes');



app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/css'));
app.use(layout);
app.use(sroutes);
app.use(uroutes);


app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('> Server up and listening on port ' + server.address().port);
});

module.exports = app;
