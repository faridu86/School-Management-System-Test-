var moment  = require('moment');

exports.getSemesters = function( req, res) {
  global.db.Academic.BatchSemester.findAll({
    where:{ fk_batch_id: req.params.batch_id, b_deleted: false}
  })
  .then( function(semesters) {
    res.json( semesters);
  })
};

exports.getSemester = function( req, res) {
  global.db.Academic.BatchSemester.find({
    where:{ fk_batch_id: req.params.batch_id, fk_semester_id: req.params.semester_id, b_deleted: false}
  })
  .then( function(semester) {
    res.json( semester);
  })
};

exports.addSemester = function( req, res) {
  var semester = req.body.semester;
  var semesterData = {
    fk_batch_id: req.params.batch_id,
    fk_semester_id: semester.semester_id,
    started_at: semester.started_at,
    ended_at: semester.ended_at,
    b_active: true,
    b_deleted: false,
    fk_created_by: req.user.id,
    fk_updated_by: req.user.id,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }
  global.db.Academic.BatchSemester.create( semesterData)
  .then( function(semester){
    res.json(semester);
  })
};

exports.editSemester = function( req, res) {
  var semester = req.body.semester;
  global.db.Academic.BatchSemester.find({
    where:{ fk_batch_id: req.params.batch_id, fk_semester_id: req.params.semester_id, b_deleted: false}
  })
  .then( function(smstr){
    smstr.fk_semester_id = semester.semester_id;
    smstr.started_at = semester.started_at;
    smstr.ended_at = semester.ended_at;
    smstr.b_active = semester.is_active;
    smstr.fk_updated_by = req.user.id;
    smstr.updated_at = moment().unix();
    return smstr.save();
  })
  .then( function(smstr) {
    res.json( smstr);
  })
};

exports.deleteSemester = function( req, res) {
  global.db.Academic.BatchSemester.find({
    where:{ fk_batch_id: req.params.batch_id, fk_semester_id: req.params.semester_id, b_deleted: false}
  })
  .then( function(smstr){
    smstr.b_deleted = true;
    smstr.b_active = false;
    smstr.fk_updated_by = req.user.id;
    smstr.updated_at = moment().unix();
    return smstr.save();
  })
  .then( function(smstr) {
    res.json( smstr);
  })
};