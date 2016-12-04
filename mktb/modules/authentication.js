var RSVP = require("rsvp")
    , moment    = require("moment")
    , Puid      = require('puid')
    , Promise   = require("bluebird");

exports.isLoggedIn = function ( options, callback) {
	var User = global.db.User;

    User.find( { where: { v_api_key: options.api_key} })
        .then( function(user){
            if(!!user && !!user.id){
                typeof callback === 'function' && callback(user);
            }else{
                typeof callback === 'function' && callback(null);
            }
        });
};

exports.loginUser = function( req, res) {
	var User = global.db.User;
    return User.find({where: { v_username: req.body.username, v_password: req.body.password }})
    .then( function( user){
        if(user){
            var puid = new Puid();
            req.session.api_key = puid.generate();
            user.v_api_key = req.session.api_key;

            res.cookie('mktb_api_key', user.v_api_key, { expires: new Date(Date.now() + 900000), httpOnly: true });

            console.log("req.cookies.mktb_api_key", req.cookies.mktb_api_key, { path: global.config.domainForCookie});

            return user.save()
            .then(function(){

                var UserLogins = global.db.UserLogins;
                return UserLogins.create({
                    'fk_user_id': user.id,
                    'v_ip': req.connection.remoteAddress,
                    'created_at': moment().unix(),
                    'updated_at': moment().unix(),
                    'v_api_key': user.v_api_key
                });
            });
        }else{
            throw new Error("User not found!");
        }
    }).catch( function(err) {
        console.err(err);
        return null;
    });

};

exports.logoutUser = function( req, res) {
    var User = global.db.User;

    var api_key = req.session.api_key;

    return User.find( {where: {v_api_key: api_key} })
        .then( function(user){
            if( user){
                req.session.destroy();
                res.clearCookie("mktb_api_key", { path: global.config.domainForCookie});
                user.v_api_key = null;
                return user.save();
            }else{
                console.log("Use is not logged in.")
                throw new Error("User is not logged in.")
            }
        }).catch( function(err){
            console.log(err);
            return null;
        })
};

exports.authenticateLogin = function ( options){

};

exports.authenticateloggedinPassword = function( password, api_key){
    var User = global.db.User;

    return User.find({where: { v_api_key: api_key, v_password: password }})
    .then( function( user){
        if(!!user){
            return user;
        }else{
            return false;
        }
    }).catch( function(err) {
        console.err(err);
        return null;
    });

}