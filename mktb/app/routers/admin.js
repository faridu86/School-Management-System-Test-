// this router has the routes for the actions those are performed by the ADMIN.
var path = require('path')
    , controllers = require(path.join(global.config.root, 'app/controllers'));

var express = require('express');
var subApp = express();

subApp.set('views', path.join(global.config.root, 'app/views'));

// Admin section
subApp.get('/', function( req, res) {
  res.send("admin")
});
subApp.get('/tenants', controllers.admin.getTenants);
subApp.post('/tenants', controllers.admin.addTenant);
subApp.get('/tenants/:tenant_id', controllers.admin.getTenant);
subApp.put('/tenants/:tenant_id', controllers.admin.editTenant);
subApp.delete('/tenants/:tenant_id', controllers.admin.deleteTenant);

module.exports = subApp;