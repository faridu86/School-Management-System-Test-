var bunyan = require('bunyan');
var _ = require('underscore');
var config = require('../config/config.js');

var _loggers = {};

module.exports = function(name) {
	if (!_loggers[name]) {
		_loggers[name] = bunyan.createLogger(_.defaults({name:name}, config.logger));
	}
	return _loggers[name];
};