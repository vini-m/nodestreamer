// Fs is a placeholder, because it handles opening files from the computer, not from the network
var express = require('express'),
    http = require('http'),
    path = require('path'),
    router = require('./router');

// Setting up Express
var app = express();
var express_port = process.env.PORT || 3000;
var express_ip = '0.0.0.0';
app.set('port', express_port);

// Pug template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express static files
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

// Import the router
app.use(router);

// Create ponyplayer server
var createServerCallback = function () {
    console.log('Nodestreamer is listening on port ' + app.get('port'));
};

http.createServer(app).listen(
    app.get('port'),
    express_ip,
    createServerCallback
);