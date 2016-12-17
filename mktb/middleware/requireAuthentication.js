var authentication = require("../modules/authentication");

function getApiKey( req){
    var apiKey;
    if ( req.query && req.query.api_key )
      apiKey = req.query.api_key;
    else if ( req.body && req.body.api_key )
      apiKey = req.body.api_key;
    else if ( req.get("X-mktb-api-key"))
      apiKey = req.get("X-mktb-api-key");
    else if ( req.cookies && req.cookies.mktb_api_key )
      apiKey = req.cookies.mktb_api_key;
    else if ( req.headers['X-mktb-api-key'])
      apiKey = req.headers['X-mktb-api-key'];
    else if ( req.session.api_key )
    	apiKey = req.session.api_key;
    
    return apiKey;
}

module.exports = function( req, res, next){
	var apiKey = getApiKey( req);

  if ( apiKey){
		authentication.isLoggedIn( apiKey).then( function( user){
      if(!!user && !!user.id){
				req.user = user;
				res.locals.currentUser = req.user;
				next();
			}else{
				res.format({
					text: function() {
            res.status(401).send("Can not authenticate user.");
          },
          html: function() {
            res.redirect(global.config.baseUrl);
          },
          json: function() {
            res.status(401).send({"message": "Can not authenticate user."});
          }
        });
			}
		});

	}else {
		req.session = null;
		res.format({
      text: function() {
        res.status(401).send();
      },
      html: function() {
        res.redirect(global.config.baseUrl);
      },
      json: function() {
        res.status(401).send();
      }
    });
	}
};