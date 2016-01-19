'use strict';

var mktbApp = angular.module('mktb', [ 'ngRoute']);

mktbApp.config( function($routeProvider){
    $routeProvider
    .when("/students", {
        templateUrl: "/public/js/acadamic/templates/student.listing.html",
        controller: 'studentListing'
    })

    .when("/students/:student_id", {
        templateUrl: "/public/js/acadamic/templates/student.details.html",
        controller: 'studentDetails'
    })

    .when("/dashboard/academic/institutions/courses", {
        templateUrl: "/public/js/acadamic/templates/courseConfig/courses.html",
        controller: "institutionCourses"
    })

    .when("/dashboard/academic/institutions/courseSemesters", {
        templateUrl: "/public/js/acadamic/templates/courseConfig/course.semesters.html",
        controller: "courseSemesters"
    })

    .when("/dashboard/academic/institutions/subjects", {
        templateUrl: "/public/js/acadamic/templates/courseConfig/subjects.html",
        controller: "institutionSubjects"
    })

    .when("/dashboard/academic/institutions/semesterSubjects", {
        templateUrl: "/public/js/acadamic/templates/courseConfig/semester.subjects.html",
        controller: "semesterSubjects"
    })

});

mktbApp.service('studentService', [ '$http', function( $http){
    var self = this;

    this.getStudents = function(){

        $http.get("/dashboard/academic/institutions/1/students")
            .success( function( result){
                console.log(result);
            })
            .error( function( data, status){
                console.log(data, status);
            })
    };

    this.getStudent = function(id){
        $http.get("/dashboard/academic/institutions/1/students/2")
            .success( function( result){
                console.log(result);
            })
            .error( function( data, status){
                console.log(data, status);
            })
    };

    this.addStudent = function( options){

    };

    this.updateStudent = function( id, options){

    };
}]);

mktbApp.service("courseConfig", ['$http', function( $http){
    var self = this;

    this.courses = function(){

    };

    this.addCourse = function(){

    };

    this.deleteCourse = function(){

    };

    this.subjects = function(){

    };

    this.addSubject = function(){

    };

    this.deleteSubject = function(){

    };

    this.semesters = function(){

    };

    this.addSemester = function(){

    };

    this.deleteSemester = function(){

    };

    this.semesterSubjcts = function(){

    };

    this.addSubjectToSemester = function(){

    };

    this.removeSubjectFromSemester = function(){

    };

}]);

mktbApp.controller("studentListing", ['$scope', 'studentService', function( $scope, studentService){
    studentService.getStudents()
}]);

mktbApp.controller("studentDetails", ['$scope', '$routeParams', function( $scope, $routeParams){
    console.log("studentDetails", $routeParams);
}]);

mktbApp.controller( "institutionCourses", ['$scope', function( $scope){

}]);

mktbApp.controller( "courseSemesters", ['$scope', function( $scope){

}]);

mktbApp.controller( "institutionSubjects", ['$scope', function( $scope){

}]);

mktbApp.controller( "semesterSubjects", ['$scope', function( $scope){

}]);