
var Sequelize = require('sequelize')
	, moment = require('moment')
	, authentication = require( global.config.root + '/modules/authentication');

exports.index = function ( req, res){
	res.render("home/index", { layout: "home/layout" }); 
}

exports.dashboard = function( req, res){
	if( req.session.api_key){
		res.send("welcome to the dashboard:::" + req.session.api_key);
	}else{
		res.send("Please login");
	}
}

exports.login = function(req, res){

	if( req.body.username && req.body.username.trim() && req.body.password && req.body.password.trim() ){

		authentication.loginUser(req)
		.then( function(theUser){
			res.redirect("/dashboard");
		})
		.catch( function(err){
			res.send(err);
		}); 
		
	}else{
		res.status(401).send("Enter username and password");
	}
}

exports.logout = function(req, res){
	authentication.logoutUser(req)
	.then( function(theUser){
		res.redirect("/");
	})
	.catch( function(err){
		res.send(err);
	}); 	
}

exports.changePassword = function(req, res){
	if(!req.body.password){
		res.render("home/change-password", { layout: "home/layout" });	
	}else{
		var errMessages = {};
		errMessages.newPassMatch = req.body.new_password == req.body.confirm_password;

		authentication.authenticateloggedinPassword( req.body.password, req.session.api_key)
		.then(function(user){

			errMessages.currentPassMatch = !!user;

			if( errMessages.newPassMatch && !!errMessages.currentPassMatch){
				
				user.changePassword( req.body.new_password)
				.then( function(){
					console.log("password changed.")
					var successMessages = {};
					successMessages.passwordChanged = true;
					res.render("home/change-password", { successMessages: successMessages, layout: "home/layout" });
				});

			}else{
				res.render("home/change-password", { errMessages: errMessages, layout: "home/layout" });
			}

		})


	}
	
}

exports.forgotPassword = function(req, res){
	if(!req.body.email){
		res.render("home/forgot-password");
	}else{

		var User = global.db.User;

		User.find({where:{v_email:req.body.email}})
			.then( function(user){
				if(user){
					user.saveResetPasswordEmail(res.render)
					.then( function( signatuer){
						if(signatuer){
							res.send("email sent")	
						}else{
							res.send("email can't sent")
						}
						
					})
					// res.send("email sent")
				}else{
					res.send("wrong email entered")
				}
			})
			.catch( function(err){
				console.log(err);
				res.send("wrong email")
			});
		// res.render("email-templates/password/forgot-password", {layout:"email-templates/password/layout"}, function( err, html){
		// 	console.log("html:::", html);
		// 	res.send("email sent.");
		// })	
	}
	
}

exports.resetPasswordEmail = function(req, res){
	res.render("home/forgot-password", { layout: "home/layout" });
}

exports.resetPasswordView = function(req, res){
	res.render("home/reset-password", { layout: "home/layout" });
}

exports.resetPassword = function(req, res){
	res.render("home/reset-password", { layout: "home/layout" });
}