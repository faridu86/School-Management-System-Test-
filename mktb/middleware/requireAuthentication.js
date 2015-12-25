var authentication = require("../modules/authentication");

function getApiKey( req){
    var api_key;
    if ( req.query && req.query.api_key )
        api_key = req.query.api_key;

    else if ( req.body && req.body.api_key )
        api_key = req.body.api_key;

    else if ( req.get("X-mktb-api-key"))
        api_key = req.get("X-mktb-api-key");

    else if ( req.cookies && req.cookies.mktb_api_key )
        api_key = req.cookies.mktb_api_key;

    else if ( req.headers['X-mktb-api-key'])
        api_key = req.headers['X-mktb-api-key'];
    
    else if ( req.session.api_key )
    	api_key = req.session.api_key;
    
    return api_key;
}

module.exports = function( req, res, next){
	var api_key = getApiKey( req);

	if ( api_key){
		authentication.isLoggedIn( { api_key: api_key}, function( user){
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
		} );

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