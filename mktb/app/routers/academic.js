var path = require('path')
    , controllers = require(path.join(global.config.root, 'app/controllers'));

var express = require('express');

var subApp = express();

subApp.set('views', path.join(global.config.root, 'app/views'));

subApp.get("/institutions/:institution_id", controllers.academic.dashboard.index);

subApp.get("/institutions/:institution_id/students", controllers.academic.students.index);
subApp.get("/institutions/:institution_id/students/:student_id", controllers.academic.students.student);



subApp.get("/institutions/:institution_id/courses", controllers.academic.configuration.course.course.getCourses);
subApp.post("/institutions/:institution_id/courses", controllers.academic.configuration.course.course.addCourse);
subApp.get("/institutions/:institution_id/courses/:course_id", controllers.academic.configuration.course.course.getCourse);
subApp.put("/institutions/:institution_id/courses/:course_id", controllers.academic.configuration.course.course.editCourse);
subApp.delete("/institutions/:institution_id/courses/:course_id", controllers.academic.configuration.course.course.deleteCourse);

subApp.get("/institutions/:institution_id/subjects", controllers.academic.configuration.subject.getSubjects);
subApp.post("/institutions/:institution_id/subjects", controllers.academic.configuration.subject.addSubject);
subApp.get("/institutions/:institution_id/subjects/:subject_id", controllers.academic.configuration.subject.getSubject);
subApp.put("/institutions/:institution_id/subjects/:subject_id", controllers.academic.configuration.subject.editSubject);
subApp.delete("/institutions/:institution_id/subjects/:subject_id", controllers.academic.configuration.subject.deleteSubject);

subApp.get("/institutions/:institution_id/courses/:course_id/semesters", controllers.academic.configuration.course.semester.getSemesters);
subApp.post("/institutions/:institution_id/courses/:course_id/semesters", controllers.academic.configuration.course.semester.addSemester);
subApp.get("/institutions/:institution_id/courses/:course_id/semesters/:semester_id", controllers.academic.configuration.course.semester.getSemester);
subApp.put("/institutions/:institution_id/courses/:course_id/semesters/:semester_id", controllers.academic.configuration.course.semester.editSemester);
subApp.delete("/institutions/:institution_id/courses/:course_id/semesters/:semester_id", controllers.academic.configuration.course.semester.deleteSemester);

subApp.get("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects", controllers.academic.configuration.course.semester.getSubjects);
subApp.post("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects", controllers.academic.configuration.course.semester.addSubject);
subApp.get("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects/:subject_id", controllers.academic.configuration.course.semester.getSubject);
subApp.put("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects/:subject_id", controllers.academic.configuration.course.semester.editSubject);
subApp.delete("/institutions/:institution_id/courses/:course_id/semesters/:semester_id/subjects/:subject_id", controllers.academic.configuration.course.semester.deleteSubject);



subApp.get("/institutions/:institution_id/courses/:course_id/batches", controllers.academic.courseConfig.batches);
subApp.post("/institutions/:institution_id/courses/:course_id/batches", controllers.academic.courseConfig.addBatch);
subApp.delete("/institutions/:institution_id/courses/:course_id/batches/:batch_id", controllers.academic.courseConfig.deleteBatch);

module.exports = subApp;