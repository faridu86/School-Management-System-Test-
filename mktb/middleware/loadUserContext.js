
userContext = require(global.config.root + "/modules/userContext"),

module.exports = function(req, res, next){

  userContext.getUserContext(req.user)
	.then(function(institutions){
    req.userContext = institutions;
    next();
  })
  .catch(function(){
  	next();
  });
	
}