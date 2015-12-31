var Sequelize = require('sequelize')
        , _ = require('underscore');

exports.index = function( req, res){
	res.format({
		html: function() {
            res.render("academic/dashboard", { layout: "academic/layout"})
        },
        json: function() {
            res.status(200).send({});
        }
    });
}
