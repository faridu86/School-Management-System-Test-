var Sequelize = require('sequelize')
    , _ = require('underscore');

exports.index = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "farid"});
        }
    });
}

exports.index = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({name: "farid", address: "peshawar"} );
        }
    });
}

exports.student = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "farid"});
        }
    });
}
