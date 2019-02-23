var Sequelize = require('sequelize')
	, _ = require('underscore');

exports.index = function( req, res){
	res.send( req.userContext)
};

exports.institution = function( req, res){
	var institution = _.find( req.userContext, function(int) {
		return int.id == req.params.institution_id;
	})
	res.send( institution)
};

