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

subApp.get("/institutions/:institution_id/courses", controllers.academic.courses.index);
subApp.post("/institutions/:institution_id/courses", controllers.academic.courses.add);
subApp.delete("/institutions/:institution_id/courses/:course_id", controllers.academic.courses.delete);

subApp.get("/institutions/:institution_id/subjects", controllers.academic.courses.subjects);
subApp.post("/institutions/:institution_id/subjects", controllers.academic.courses.addSubject);
subApp.delete("/institutions/:institution_id/subjects/:subject_id", controllers.academic.courses.deleteSubject);

subApp.get("/institutions/:institution_id/courses/:course_id/semesters", controllers.academic.courses.semesters);
subApp.post("/institutions/:institution_id/courses/:course_id/semesters", controllers.academic.courses.addSemester);
subApp.delete("/institutions/:institution_id/courses/:course_id/semesters/:semester_id", controllers.academic.courses.deleteSemester);

subApp.get("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects", controllers.academic.courses.semesterSubjects);
subApp.post("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects", controllers.academic.courses.addSubjectToSemester);
subApp.delete("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects/:subject_id", controllers.academic.courses.removeSubjectFromSemester);

module.exports = subApp;