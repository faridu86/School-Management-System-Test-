var moment  = require('moment');

exports.getBatches = function( req, res) {
  global.db.Academic.Batch.findAll({
    where:{ fk_course_id: req.params.course_id, b_deleted: false}
  })
  .then( function(batches) {
    res.json( batches);
  })
};

exports.getBatch = function( req, res) {
  global.db.Academic.Batch.find({
    where:{ fk_course_id: req.params.course_id, id: req.params.batch_id, b_deleted: false}
  })
  .then( function(batch) {
    res.json( batch);
  })
};

exports.addBatch = function( req, res) {
  var batch = req.body.batch;
  var batchData = {
    fk_course_id: req.params.course_id,
    v_batch: batch.batch,
    started_at: batch.started_at,
    ended_at: batch.ended_at,
    b_active: true,
    b_deleted: false,
    fk_created_by: req.user.id,
    fk_updated_by: req.user.id,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }
  global.db.Academic.Batch.create( batchData)
  .then( function(batch){
    res.json(batch);
  })
};

exports.editBatch = function( req, res) {
  var batch = req.body.batch;
  global.db.Academic.Batch.find({
    where:{ fk_course_id: req.params.course_id, id: req.params.batch_id, b_deleted: false}
  })
  .then( function(btch){
    btch.v_batch = batch.batch;
    btch.started_at = batch.started_at;
    btch.ended_at = batch.ended_at;
    btch.b_active = batch.is_active;
    btch.fk_updated_by = req.user.id;
    btch.updated_at = moment().unix();
    return btch.save();
  })
  .then( function(btch) {
    res.json( btch);
  })
};

exports.deleteBatch = function( req, res) {
  global.db.Academic.Batch.find({
    where:{ fk_course_id: req.params.course_id, id: req.params.batch_id, b_deleted: false}
  })
  .then( function(btch){
    btch.b_active = false;
    btch.b_deleted = true;
    btch.fk_updated_by = req.user.id;
    btch.updated_at = moment().unix();
    return btch.save();
  })
  .then( function(btch) {
    res.json( btch);
  })
};