var path = require('path');

if (!global.hasOwnProperty('db'))
    require(path.join(global.config.root, 'db'));

var sequelize = global.db.sequelize;

var models;

// models
global.db = models = {
	User: sequelize.import(__dirname + '/User'),
	UserLogins: sequelize.import(__dirname + '/UserLogins')
}