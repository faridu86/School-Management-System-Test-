//this controller has tenant actions (actons performed by tenant). 
var moment  = require('moment');

exports.getInstitutions = function( req, res){
  global.db.Institutions.findAll({
    where: { fk_tenant_id: req.tenant.id, b_deleted: false }
  })
  .then( function( institutions){
    res.json( institutions);
  });
}

exports.getInstitution = function( req, res){
  global.db.Institutions.find({
    where: { fk_tenant_id: req.tenant.id, id: req.params.institution_id }
  })
  .then( function( institution){
    res.json( institution);
  });
}

exports.addInstitution = function( req, res){
  var institution = req.body.institution;
  var institutionData = {
    fk_tenant_id: req.tenant.id,
    v_name: institution.v_name,
    v_city: institution.v_city,
    v_state: institution.v_state,
    v_address: institution.v_address,
    v_phone: institution.v_phone,
    b_active: institution.b_active,
    b_deleted: false,
    fk_created_by: req.user.id,
    fk_updated_by: req.user.id,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }
  global.db.Institutions.create(institutionData)
  .then( function( institution){
    res.json( institution);
  });
}

exports.editInstitution = function( req, res){
  var institution = req.body.institution;
  global.db.Institutions.find({
    where: { fk_tenant_id: req.tenant.id, id: req.params.institution_id }
  })
  .then( function( inst){
    inst.v_name = institution.v_name;
    inst.v_city = institution.v_city;
    inst.v_state = institution.v_state;
    inst.v_address = institution.v_address;
    inst.v_phone = institution.v_phone;
    inst.b_active = institution.b_active;
    inst.fk_updated_by = req.user.id;
    inst.updated_at = moment().unix();
    return inst.save();
  })
  .then( function(inst){
    res.json(inst);
  })
}

exports.deleteInstitution = function( req, res){
  global.db.Institutions.find({
    where: { fk_tenant_id: req.tenant.id, id: req.params.institution_id }
  })
  .then( function( inst){
    inst.b_active = false;
    inst.b_deleted = true;
    inst.fk_updated_by = req.user.id;
    inst.updated_at = moment().unix();
    return inst.save();
  })
  .then( function(inst){
    res.json(inst);
  })
}
