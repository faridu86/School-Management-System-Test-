var path 	= require('path')
	, home 	= require('../app/controllers/home');

require('../app/models');

module.exports = function (app) {

	app.get("/", home.index);
	app.get("/dashboard", home.dashboard);
	
	app.post("/login", home.login);
	app.get("/logout", home.logout);

	app.get("/change-password", home.changePassword);
	app.post("/change-password", home.changePassword);

	app.get("/forgot-password", home.forgotPassword);
	app.post("/forgot-password", home.forgotPassword);

	app.get("/reset-password/:signature", home.resetPassword);
	app.post("/reset-password/:signature", home.resetPassword);

}

