var path = require('path');

if (!global.hasOwnProperty('db'))
    require(path.join(global.config.root, 'db'));

var sequelize = global.db.sequelize;

var models;

// models
global.db = models = {
	Academic: {
		Batch: sequelize.import(__dirname + '/academic/configuration/Batch/Batch'),
		BatchSemester: sequelize.import(__dirname + '/academic/configuration/Batch/Semester'),
		Course: sequelize.import(__dirname + '/academic/configuration/course/Course'),
		Semester: sequelize.import(__dirname + '/academic/configuration/course/Semester'),
		SemesterDefaultSubject: sequelize.import(__dirname + '/academic/configuration/course/SemesterDefaultSubject'),
		Subject: sequelize.import(__dirname + '/academic/configuration/Subject')
	},
	Admin: sequelize.import(__dirname + '/Admins'),
	EmailNotifications: sequelize.import(__dirname + '/EmailNotifications'),
	Institutions: sequelize.import(__dirname + '/Institutions'),
	InstitutionUsers: sequelize.import(__dirname + '/InstitutionUsers'),
	Permissions: sequelize.import(__dirname + '/Permissions'),
	RolePermissions: sequelize.import(__dirname + '/RolePermissions'),
	Roles: sequelize.import(__dirname + '/Roles'),
	Tenant: sequelize.import(__dirname + '/Tenant'),
	User: sequelize.import(__dirname + '/User'),
	UserLogins: sequelize.import(__dirname + '/UserLogins'),
	UserPasswords: sequelize.import(__dirname + '/UserPasswords'),
	UserRequestSignatures: sequelize.import(__dirname + '/UserRequestSignatures'),
};

models.Institutions.hasMany( models.InstitutionUsers, { foreignKey: 'fk_institution_id'});
models.InstitutionUsers.belongsTo( models.Institutions, { foreignKey: 'fk_institution_id'});

models.Roles.hasMany( models.InstitutionUsers, { foreignKey: 'fk_role_id'});
models.InstitutionUsers.belongsTo( models.Roles, { foreignKey: 'fk_role_id'});

models.User.hasMany( models.Tenant, { foreignKey: 'fk_user_id'});
models.Tenant.belongsTo( models.User, { foreignKey: 'fk_user_id'});