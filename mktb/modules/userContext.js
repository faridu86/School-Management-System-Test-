var _ = require('underscore');
var Promise = require('bluebird');

exports.getUserContext = function(user){

	return new Promise( function( resolve, reject){

		var userInstitutions = {};
		var userInstitutionWebapps = {};
		var userInstitutionPermissions = {};

		console.log("hello context");

		global.db.Institutions.findAll(function( institutions){
			console.log("institutions:::", institutions);
			return institutions;
		});

		console.log("hello context 2");
		
		resolve( true);
	});
}