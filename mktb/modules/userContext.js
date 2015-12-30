var _ = require('underscore');
var Promise = require('bluebird');

exports.getUserContext = function(user){

	return new Promise( function( resolve, reject){

		var userInstitutions = {};
		var userInstitutionWebapps = {};
		var userInstitutionPermissions = {};

		global.db.UserInstitutions.getUserInstitutions(user)
		.then( function(institutions){
			userInstitutions = _.uniq( _.map( institutions, function(institution){
				return institution.institution;
			}) , "id" );

			_.forEach( userInstitutions, function( institution, key){
				
				var institutionId = institution.id;

				roles = _.filter( _.uniq( _.map( institutions, function (institution) {
					if( institutionId == institution.fk_institution_id)
						return institution.role;
				}) , "id"), function( institution){ return institution != null} );

				institution.setDataValue("roles", roles);
			});

			return userInstitutions;
		})
		.then( function( institutions){
			resolve( institutions);
		})
		
	});
}