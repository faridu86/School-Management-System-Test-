var Sequelize = require('sequelize')
    , _ = require('underscore');

exports.index = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "courses"});
        }
    });
};

exports.add = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "course add"});
        }
    });
};

exports.delete = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "course delete"});
        }
    });
};

exports.subjects = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "subjects"});
        }
    });
};

exports.addSubject = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "subject add"});
        }
    });
};

exports.deleteSubject = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "subject delete"});
        }
    });
}

exports.semesters = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "semesters"});
        }
    });
};

exports.addSemester = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "semester add"});
        }
    });
};

exports.deleteSemester = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "semester delete"});
        }
    });
};

exports.semesterSubjects = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "semesters"});
        }
    });
};

exports.addSubjectToSemester = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "semester add"});
        }
    });
};

exports.removeSubjectFromSemester = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "semester delete"});
        }
    });
};