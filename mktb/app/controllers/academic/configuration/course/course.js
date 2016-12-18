var moment  = require('moment');
exports.getCourses = function( req, res) {
    global.db.Academic.Course.findAll({
        where:{ fk_institution_id: req.params.institution_id, b_deleted: false}
    })
    .then( function(courses) {
        res.json( courses);
    })
};

exports.getCourse = function( req, res) {
    global.db.Academic.Course.find({
        where:{ fk_institution_id: req.params.institution_id, id: req.params.course_id, b_deleted: false }
    })
    .then( function(course) {
        res.json( course);
    })
};

exports.addCourse = function( req, res){
    var course = req.body.course;
    var courseData = {
        fk_institution_id: req.params.institution_id,
        v_name: course.name,
        v_description: course.description,
        b_active: true,
        b_deleted: false,
        fk_created_by: req.user.id,
        fk_updated_by: req.user.id,
        created_at: moment().unix(),
        updated_at: moment().unix()
    };
    global.db.Academic.Course.create( courseData)
    .then( function(course){
        res.json(course);
    })
};

exports.editCourse = function( req, res){
    var course = req.body.course;
    global.db.Academic.Course.find({
        where:{ fk_institution_id: req.params.institution_id, id: req.params.course_id }
    })
    .then( function(crs) {
        crs.v_name = course.name;
        crs.v_description = course.description;
        crs.b_active = course.is_active;
        crs.fk_updated_by = req.user.id;
        crs.updated_at = moment().unix();
        return crs.save();
    })
    .then( function(crs) {
        res.json(crs);
    });
};

exports.deleteCourse = function( req, res){
    global.db.Academic.Course.find({
        where:{ fk_institution_id: req.params.institution_id, id: req.params.course_id }
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
