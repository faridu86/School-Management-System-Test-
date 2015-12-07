global.config = require('./config/config');
if (global.config.environment == "production" || global.config.environment == "stage") require('newrelic');

var http = require('http');
http.globalAgent.maxSockets = 100;
var https = require('https');
https.globalAgent.maxSockets = 100;


var cluster = require('cluster');
var env = process.env.NODE_ENV || 'development';


if (cluster.isMaster) {

	cluster.on('disconnect', function(worker) {
		console.error('disconnected worker: ' + worker.id);
		var newWorker = cluster.fork().process;
		console.log('New worker started. process id %s', newWorker.pid);
	});
	

	cluster.on('online', function(worker) {
		console.log('New worker is online. worker: ' + worker.id);
		worker.on('message', function(message) {
			switch (message.cmd) {
				case 'notify':
					console.log('Notify Message received from worker. ID: ' + message.feedId);
					global.notifyWorker.send(message);
					break;
				case 'feed':
					console.log('Feed Message received from worker. ID: ' + message.feedId);
					global.userFeedWorker.send(message);
					break;
			}
		});
	});

	var cpuCount = (global.config.environment == "production") && require('os').cpus().length > 1 ? require('os').cpus().length - 1 : 1;

	for (var i = 0; i < cpuCount; i += 1) {
		var worker = cluster.fork().process;
		console.log('worker started. process id %s', worker.pid);
	}

} else {

	var express = require('express');
	var config = require('./config/express');
	var routes = require('./config/routes');
	var app = express();

	config(app, cluster);
	routes(app);

	global.server = app.listen(global.config.port, function() {
		console.log('Express server listening on port ' + global.config.port);
	});

	module.exports = app;
}

