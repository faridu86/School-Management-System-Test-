// this controller has admin actions (actions performed by admin).
var moment  = require('moment');
var _ = require('underscore');

exports.getTenants = function( req, res) {
  global.db.Tenant.getTenants()
  .then( function( tenants){
    res.json(tenants);
  })
};

exports.addTenant = function( req, res) {
  var tenant = req.body.tenant;
  var tenantData = {
    fk_user_id: tenant.fk_user_id,
    v_name: tenant.v_name,
    v_address: tenant.v_address,
    v_city: tenant.v_city,
    v_state: tenant.v_state,
    b_active: tenant.b_active,
    fk_created_by: req.user.id,
    fk_updated_by: req.user.id,
    created_at: moment().unix(),
    updated_at: moment().unix()
  };

  global.db.Tenant.create(tenantData)
  .then( function( tenant){
    res.json(tenant);
  })
};

exports.getTenant = function( req, res) {
  global.db.Tenant.find(
    { 
      where: { id: req.params.tenant_id },
      include: [
        { model: global.db.User }
      ]
    }
  )
  .then( function( tenant){
    res.json(tenant);
  })
};

exports.editTenant = function( req, res) {
  var tenant = req.body.tenant;
  global.db.Tenant.find({ where: { id: req.params.tenant_id }})
  .then( function( t){
    t.fk_user_id = tenant.fk_user_id;
    t.v_name = tenant.v_name;
    t.v_address = tenant.v_address;
    t.v_city = tenant.v_city;
    t.v_state = tenant.v_state;
    t.b_active = tenant.b_active;
    t.fk_updated_by = req.user.id;
    t.updated_at = moment().unix();
    return t.save();
  })
  .then( function( tenant){
    res.json(tenant);
  })
};

exports.deleteTenant = function( req, res) {
  global.db.Tenant.find({ where: { id: req.params.tenant_id }})
  .then( function( t){
    t.b_active = false;
    t.b_deleted = true;
    t.fk_updated_by = req.user.id;
    t.updated_at = moment().unix();
    return t.save();
  })
  .then( function( tenant){
    res.json(tenant);
  })
};

exports.findUser = function( req, res) {
  var email = req.query.email;
  global.db.Tenant.getTenants()
  .then( function( tenants){
    var tenantIds = _.map( tenants, function(tenant){
      return tenant.fk_user_id;
    })
    return global.db.User.find({
      where: ["v_email LIKE ? AND id NOT IN (?)", email, tenantIds]
    })
  }).then( function(user){
    res.json(user)
  }).catch( function( error) {
    res.send(error)
  })
};