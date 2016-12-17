var path = require('path');

if (!global.hasOwnProperty('db'))
    require(path.join(global.config.root, 'db'));

var sequelize = global.db.sequelize;

var models;

// models
global.db = models = {
	Admins: sequelize.import(__dirname + '/Admins'),
	EmailNotifications: sequelize.import(__dirname + '/EmailNotifications'),
	Institutions: sequelize.import(__dirname + '/Institutions'),
	Permissions: sequelize.import(__dirname + '/Permissions'),
	RolePermissions: sequelize.import(__dirname + '/RolePermissions'),
	Roles: sequelize.import(__dirname + '/Roles'),
	User: sequelize.import(__dirname + '/User'),
	InstitutionUsers: sequelize.import(__dirname + '/InstitutionUsers'),
	UserLogins: sequelize.import(__dirname + '/UserLogins'),
	UserPasswords: sequelize.import(__dirname + '/UserPasswords'),
	UserRequestSignatures: sequelize.import(__dirname + '/UserRequestSignatures'),
};

models.Institutions.hasMany( models.InstitutionUsers, { foreignKey: 'fk_institution_id'});
models.InstitutionUsers.belongsTo( models.Institutions, { foreignKey: 'fk_institution_id'});

models.Roles.hasMany( models.InstitutionUsers, { foreignKey: 'fk_role_id'});
models.InstitutionUsers.belongsTo( models.Roles, { foreignKey: 'fk_role_id'});
