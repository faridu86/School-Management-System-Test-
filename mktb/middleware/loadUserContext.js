
userContext = require(global.config.root + "/modules/userContext"),

module.exports = function(req, res, next){

	userContext.getUserContext(req.user)
	.then(function(facilities){

        req.userContext = facilities;

        next();

    })
    .catch(function(){

    	next();

    });
	
}