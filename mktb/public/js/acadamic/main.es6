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

mktbApp.controller("studentListing", ['$scope', 'studentService', function($scope, studentService){
    studentService.getStudents()
}]);

mktbApp.controller("studentDetails", ['$scope', '$routeParams', function($scope, $routeParams){
    console.log("studentDetails", $routeParams);
}]);