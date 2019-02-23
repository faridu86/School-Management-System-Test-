var moment  = require('moment');

exports.getSubjects = function( req, res) {
    global.db.Academic.Subject.findAll({
        where:{ fk_institution_id: req.params.institution_id, b_deleted: false }
    })
    .then( function(subjects) {
        res.json( subjects);
    })
};

exports.getSubject = function( req, res) {
    global.db.Academic.Subject.find({
        where:{ fk_institution_id: req.params.institution_id, id: req.params.subject_id, b_deleted: false }
    })
    .then( function(subject) {
        res.json( subject);
    })
};

exports.addSubject = function( req, res){
    var subject = req.body.subject;
    var subjectData = {
        fk_institution_id: req.params.institution_id,
        v_name: subject.name,
        v_code: subject.code,
        v_description: subject.description,
        b_active: true,
        b_deleted: false,
        fk_created_by: req.user.id,
        fk_updated_by: req.user.id,
        created_at: moment().unix(),
        updated_at: moment().unix()
    };
    global.db.Academic.Subject.create( subjectData)
    .then( function(subject){
        res.json(subject);
    })
};

exports.editSubject = function( req, res){
    var subject = req.body.subject;
    global.db.Academic.Subject.find({
        where:{ fk_institution_id: req.params.institution_id, id: req.params.subject_id }
    })
    .then( function(sbjct) {
        sbjct.v_name = subject.name;
        sbjct.v_code = subject.code;
        sbjct.v_description = subject.description;
        sbjct.b_active = subject.is_active;
        sbjct.fk_updated_by = req.user.id;
        sbjct.updated_at = moment().unix();
        return sbjct.save();
    })
    .then( function(sbjct) {
        res.json(sbjct);
    });
};

exports.deleteSubject = function( req, res){
    global.db.Academic.Subject.find({
        where:{ fk_institution_id: req.params.institution_id, id: req.params.subject_id }
    })
    .then( function(sbjct) {
        sbjct.b_active = false;
        sbjct.b_deleted = true;
        sbjct.fk_updated_by = req.user.id;
        sbjct.updated_at = moment().unix();
        return sbjct.save();
    })
    .then( function(sbjct) {
        res.json(sbjct);
    });
};
