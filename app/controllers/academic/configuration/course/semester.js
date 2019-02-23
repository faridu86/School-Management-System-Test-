var moment  = require('moment');

exports.getSemesters = function( req, res) {
    global.db.Academic.Semester.findAll({
        where:{ fk_course_id: req.params.course_id}
    })
    .then( function(semesters) {
        res.json( semesters);
    })
};

exports.getSemester = function( req, res) {
    global.db.Academic.Semester.find({
        where:{ fk_course_id: req.params.course_id, id: req.params.semester_id }
    })
    .then( function(semester) {
        res.json( semester);
    })
};

exports.addSemester = function( req, res){
    var semester = req.body.semester;
    var semesterData = {
        fk_course_id: req.params.course_id,
        v_name: semester.name,
        v_description: semester.description,
        i_order: semester.order,
        b_active: true,
        b_deleted: false,
        fk_created_by: req.user.id,
        fk_updated_by: req.user.id,
        created_at: moment().unix(),
        updated_at: moment().unix()
    };
    global.db.Academic.Semester.create( semesterData)
    .then( function(semester){
        res.json(semester);
    })
};

exports.editSemester = function( req, res){
    var semester = req.body.semester;
    global.db.Academic.Semester.find({
        where:{ fk_course_id: req.params.course_id, id: req.params.semester_id }
    })
    .then( function(crs) {
        crs.v_name = semester.name;
        crs.v_description = semester.description;
        crs.b_active = semester.is_active;
        crs.fk_updated_by = req.user.id;
        crs.updated_at = moment().unix();
        return crs.save();
    })
    .then( function(crs) {
        res.json(crs);
    });
};

exports.deleteSemester = function( req, res){
    global.db.Academic.Semester.find({
        where:{ fk_course_id: req.params.course_id, id: req.params.semester_id }
    })
    .then( function(crs) {
        crs.b_active = false;
        crs.b_deleted = true;
        crs.fk_updated_by = req.user.id;
        crs.updated_at = moment().unix();
        return crs.save();
    })
    .then( function(crs) {
        res.json(crs);
    });
};


//Semester Default Subject Actions
exports.getSubjects = function( req, res) {
    global.db.Academic.SemesterDefaultSubject.findAll({
        where:{ fk_semester_id: req.params.semester_id, b_deleted: false}
    })
    .then( function(subjects) {
        res.json( subjects);
    })
};

exports.getSubject = function( req, res) {
    global.db.Academic.SemesterDefaultSubject.find({
        where:{ fk_semester_id: req.params.semester_id, fk_subject_id: req.params.subject_id, b_deleted: false }
    })
    .then( function(semester) {
        res.json( semester);
    })
};

exports.addSubject = function( req, res){
    var subject = req.body.subject;
    var subjectData = {
        fk_semester_id: req.params.semester_id,
        fk_subject_id: subject.subject_id,
        b_active: true,
        b_deleted: false,
        fk_created_by: req.user.id,
        fk_updated_by: req.user.id,
        created_at: moment().unix(),
        updated_at: moment().unix()
    };
    global.db.Academic.SemesterDefaultSubject.create( subjectData)
    .then( function(semester){
        res.json(semester);
    })
};

exports.editSubject = function( req, res){
    var subject = req.body.subject;
    global.db.Academic.SemesterDefaultSubject.find({
        where:{ fk_semester_id: req.params.semester_id, fk_subject_id: req.params.subject_id, b_deleted: false }
    })
    .then( function(sbjct) {
        sbjct.fk_subject_id = subject.subject_id;
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
    global.db.Academic.SemesterDefaultSubject.find({
        where:{ fk_semester_id: req.params.semester_id, fk_subject_id: req.params.subject_id }
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
