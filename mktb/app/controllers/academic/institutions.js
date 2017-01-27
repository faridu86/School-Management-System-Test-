var Sequelize = require('sequelize')
	, _ = require('underscore');

exports.index = function( req, res){
	res.send( req.userContext)
};

