var path = require('path')
    , _ = require('underscore')
    , controllers = require(path.join(global.config.root, 'app/controllers'));

var express = require('express');

var subApp = express();

subApp.set('views', path.join(global.config.root, 'app/views'));

subApp.use(function (req, res, next) {
    res.locals._ = _;
    subApp.locals.domainforCookies = global.config.domainForCookie;
    subApp.locals.baseUrl = global.config.baseUrl;
    next();
});

subApp.get("/institutions/:institution_id", controllers.academic.dashboard.index);

subApp.get("/institutions/:institution_id/students", controllers.academic.students.index);
subApp.get("/institutions/:institution_id/students/:student_id", controllers.academic.students.student);

subApp.get("/institutions/:institution_id/courses", controllers.academic.courseConfig.index);
subApp.post("/institutions/:institution_id/courses", controllers.academic.courseConfig.add);
subApp.delete("/institutions/:institution_id/courses/:course_id", controllers.academic.courseConfig.delete);

subApp.get("/institutions/:institution_id/courses/:course_id/batches", controllers.academic.courseConfig.batches);
subApp.post("/institutions/:institution_id/courses/:course_id/batches", controllers.academic.courseConfig.addBatch);
subApp.delete("/institutions/:institution_id/courses/:course_id/batches/:batch_id", controllers.academic.courseConfig.deleteBatch);

subApp.get("/institutions/:institution_id/subjects", controllers.academic.courseConfig.subjects);
subApp.post("/institutions/:institution_id/subjects", controllers.academic.courseConfig.addSubject);
subApp.delete("/institutions/:institution_id/subjects/:subject_id", controllers.academic.courseConfig.deleteSubject);

subApp.get("/institutions/:institution_id/courses/:course_id/semesters", controllers.academic.courseConfig.semesters);
subApp.post("/institutions/:institution_id/courses/:course_id/semesters", controllers.academic.courseConfig.addSemester);
subApp.delete("/institutions/:institution_id/courses/:course_id/semesters/:semester_id", controllers.academic.courseConfig.deleteSemester);

subApp.get("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects", controllers.academic.courseConfig.semesterSubjects);
subApp.post("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects", controllers.academic.courseConfig.addSubjectToSemester);
subApp.delete("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects/:subject_id", controllers.academic.courseConfig.removeSubjectFromSemester);

module.exports = subApp;