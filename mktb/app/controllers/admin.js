var moment  = require('moment');

exports.getTenants = function( req, res) {
  global.db.Tenant.findAll()
  .then( function( tenants){
    res.json(tenants);
  })
};

exports.addTenant = function( req, res) {
  var tenant = req.body.tenant;
  var tenantData = {
    fk_user_id: tenant.user_id,
    v_name: tenant.name,
    v_address: tenant.address,
    v_city: tenant.city,
    v_state: tenant.state,
    created_at: moment().unix(),
    updated_at: moment().unix()
  };

  global.db.Tenant.create(tenantData)
  .then( function( tenant){
    res.json(tenant);
  })
};

exports.getTenant = function( req, res) {
  global.db.Tenant.find({ where: { id: req.params.tenant_id }})
  .then( function( tenant){
    res.json(tenant);
  })
};

exports.editTenant = function( req, res) {
  var tenant = req.body.tenant;
  global.db.Tenant.find({ where: { id: req.params.tenant_id }})
  .then( function( t){
    t.fk_user_id = tenant.user_id;
    t.v_name = tenant.name;
    t.v_address = tenant.address;
    t.v_city = tenant.city;
    t.v_state = tenant.state;
    t.b_active = tenant.is_active;
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
    t.updated_at = moment().unix();
    return t.save();
  })
  .then( function( tenant){
    res.json(tenant);
  })
};
