// this router has the routes for the actions those are performed by the TENANT.
var path = require('path')
    , controllers = require(path.join(global.config.root, 'app/controllers'));

var express = require('express');
var subApp = express();

subApp.set('views', path.join(global.config.root, 'app/views'));

// Admin section
subApp.get('/', function( req, res){
  res.send( "tenant")
});
subApp.get('/institutions', controllers.tenant.getInstitutions);
subApp.post('/institutions', controllers.tenant.addInstitution);
subApp.get('/institutions/:institution_id', controllers.tenant.getInstitution);
subApp.put('/institutions/:institution_id', controllers.tenant.editInstitution);
subApp.delete('/institutions/:institution_id', controllers.tenant.deleteInstitution);

module.exports = subApp;