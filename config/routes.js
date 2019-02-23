var path = require('path')
	, home = require('../app/controllers/home')
	, isAdmin = require('../middleware/isAdmin')
	, isTenant = require('../middleware/isTenant')
	, requireAuthentication	= require('../middleware/requireAuthentication')
	, loadUserContext	= require('../middleware/loadUserContext')
	, routers = require(path.join(global.config.root, 'app/routers'))
	, _ = require('underscore');

require('../app/models');

module.exports = function (app) {

	app.use(function (req, res, next) {
	    res.locals._ = _;
	    app.locals.domainforCookies = global.config.domainForCookie;
	    app.locals.baseUrl = global.config.baseUrl;
	    next();
	});

	app.get("/", home.index);
	app.get("/dashboard", requireAuthentication, loadUserContext, home.dashboard);
	
	app.post("/login", home.login);
	app.get("/logout", home.logout);

	app.get("/change-password", home.changePassword);
	app.post("/change-password", home.changePassword);

	app.get("/forgot-password", home.forgotPassword);
	app.post("/forgot-password", home.forgotPassword);

	app.get("/reset-password/:signature", home.resetPassword);
	app.post("/reset-password/:signature", home.resetPassword);

	app.use("/dashboard/admin", requireAuthentication, isAdmin, loadUserContext, routers.admin)
	app.use("/dashboard/tenant", requireAuthentication, isTenant, loadUserContext, routers.tenant)
	app.use("/dashboard/academic", requireAuthentication, loadUserContext, routers.academic)

}

