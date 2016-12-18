//this controller has tenant actions (actons performed by tenant). 
var moment  = require('moment');

exports.getInstitutions = function( req, res){
  global.db.Institutions.findAll({
    where: { fk_tenant_id: req.tenant.id }
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
    v_name: institution.name,
    v_city: institution.city,
    v_state: institution.state,
    v_address: institution.address,
    v_phone: institution.phone,
    b_active: true,
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
    inst.v_name = institution.name;
    inst.v_city = institution.city;
    inst.v_state = institution.state;
    inst.v_address = institution.address;
    inst.v_phone = institution.phone;
    inst.b_active = institution.is_active;
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
