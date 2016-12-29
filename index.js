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

// Setting up Cluster
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

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

// Snippet taken from https://github.com/licson0729/node-YouTubeStreamer/blob/master/server.js
// Master process, fork child
if (cluster.isMaster) {
    // Fork based on the number of CPUs
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    // Restart childs when they die
    cluster.on('exit', function (worker, code) {
        console.log('Worker ' + worker.process.pid + ' died with code ' + code);
        cluster.fork();
    });
    
    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is ready!');
    });
} else {
    var createServer = function () {
        console.log('Nodestreamer is listening on port ' + app.get('port'));
    };
    http.createServer(app).listen(
        app.get('port'),
        express_ip,
        createServer
    );
}