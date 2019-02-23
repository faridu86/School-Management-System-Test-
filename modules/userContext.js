var _ = require('underscore');
var Promise = require('bluebird');

exports.getUserContext = function(user){

	return new Promise( function( resolve, reject){

		var institutionUsers = {};
		var userInstitutionWebapps = {};
		var userInstitutionPermissions = {};

		global.db.InstitutionUsers.getUserInstitutions(user)
		.then( function(institutions){
			institutionUsers = _.uniq( _.map( institutions, function(institution){
				return institution.institution;
			}), "id");
			_.forEach( institutionUsers, function( institution){
				var institutionId = institution.id;
				roles = _.map( _.filter( institutions, function( i){
					return i.id === institutionId;
				}), function( institution) {
					return _.pick( institution, "role");
				} );
				institution.setDataValue( "roles", roles);
			});
			return institutionUsers;
		})
		.then( function( institutions){
			resolve( institutions);
		})
		
	});
}