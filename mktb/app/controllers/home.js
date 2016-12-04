
var sequelize			= require('sequelize')
	, moment			= require('moment')
	, Promise			= require('moment')
	, authentication 	= require( global.config.root + '/modules/authentication');

exports.index = function ( req, res){
	res.render("home/index", { layout: "home/layout" }); 
}

exports.dashboard = function( req, res){
	var api_key = req.session.api_key?req.session.api_key: req.cookies.mktb_api_key;
	
	res.render("home/dashboard", { userContext: req.userContext});
}

exports.login = function(req, res){

	if( req.body.username && req.body.username.trim() && req.body.password && req.body.password.trim() ){
		authentication.loginUser(req , res)
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
	authentication.logoutUser( req, res)
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
					.then( function( signature){
						if(signature){
							var messages = {
								success: "Password reset instrunction has been sent to you in email. Please check your inbox in a short while. Thanks."
							};
							res.render("home/forgot-password", { messages: messages});
						}else{
							res.send("email can't sent")
						}
						
					})
					// res.send("email sent")
				}else{
					var messages = {
						noEmail: "Email does not exist in our database. Please enter correct email."
					};
					res.render("home/forgot-password", { messages: messages});
				}
			})
			.catch( function(err){
				console.log(err);
				res.send("wrong email")
			});
	}
	
}

exports.resetPassword = function(req, res){
	
	var signature = req.params.signature;
	var UserRequestSignatures = global.db.UserRequestSignatures;
	var User = global.db.User;
	var messages = {};
	var vSignatureRow = {};

	UserRequestSignatures.find( { where: [ " v_signature = ? AND v_request LIKE ? AND i_expiry > ? AND i_completed is null ", signature, "PasswordReset", moment().unix() ] })
		.then( function( signatureRow){
			signatureRow = Array.isArray(signatureRow) ? signatureRow[0] : signatureRow;

			if(!signatureRow || !signatureRow.v_signature){
				messages.inCorrectSignature = "Your password reset link is either incorrect or expired. You can get new one by following forgot password.";
				throw "inCorrectSignature";
			}
			vSignatureRow = signatureRow;
			return signatureRow;
		})
		.then( function(signatureRow){
			if(!req.body.password || req.body.password == req.body.confirm_password){
				return signatureRow;
			}else if( req.body.password != req.body.confirm_password){
				messages.passwordsNotMatching = "Your passwords do not match.";
				throw "passwordsNotMatching";
			}
		})
		.then( function(signatureRow){
			if(!!messages.inCorrectSignature || !!messages.passwordsNotMatching){
				return false;
			}else{
				return User.find({where:{ id: signatureRow.fk_user_id}});
			}
		})
		.then( function(user){
			if(!user){
				throw "UserNotFound";
			}else{
				return user.changePassword( req.body.password);
			}
		})
		.then( function(isReset){
			if(isReset){
				messages.resetPassword = "Your password has been reset successfully. Login now. "
				vSignatureRow.i_completed = moment().unix();
				return vSignatureRow.save();
			}else{
				throw "Cannot reset password";
			}
		})
		.then( function(){
			res.render("home/reset-password", { signature: signature, messages: messages})
		})
		.catch( function( err){
			console.log("error thrown:::", err);
			res.render("home/reset-password", { signature: signature, messages: messages})
		});

}

