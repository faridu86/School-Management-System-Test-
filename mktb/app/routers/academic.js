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

module.exports = subApp;