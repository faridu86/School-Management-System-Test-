var path = require('path');

if (!global.hasOwnProperty('db'))
    require(path.join(global.config.root, 'db'));

var sequelize = global.db.sequelize;

var models;

// models
global.db = models = {
	EmailNotifications: sequelize.import(__dirname + '/EmailNotifications'),
	User: sequelize.import(__dirname + '/User'),
	UserRequestSignatures: sequelize.import(__dirname + '/UserRequestSignatures'),
	UserLogins: sequelize.import(__dirname + '/UserLogins')
}