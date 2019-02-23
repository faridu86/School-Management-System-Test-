

var http = require('http')
        , path = require('path')
        , express = require('express')
        , cookieParser = require('cookie-parser')
        , session = require('express-session')
        , compress = require('compression')
        , favicon = require('static-favicon')
        , logger = require('morgan')
        , partials = require('express-partials')
        , bodyParser = require('body-parser')
        , methodOverride = require('method-override')
        , multipart = require('connect-multiparty')
        , errorHandler = require('errorhandler')
        , MemoryStore = require('connect').session.MemoryStore
        , mobile = require(path.join(global.config.root, 'middleware/mobile'))
        , _ = require('underscore')
        , i18n = require("i18n");

module.exports = function (app, cluster) {

    app.use(function (req, res, next) {

        var domain = require('domain').create();

        domain.add(req);
        domain.add(res);

        domain.on('error', function (err) {
        
            req.log.error(err);        
            console.error('Error message: %s', err.message);
            console.error('Stack trace: %s', err.stack);
            try {
                var killtimer = setTimeout(function () {
                    process.exit(1);
                }, 30000);

                killtimer.unref();

                global.server.close();
                cluster.worker.disconnect();

                res.statusCode = 500;

                  res.render('404', {title: 'Page not found', status: '500', message: 'Sorry for Inconvenience'});

            } catch (er2) {
                console.error('Error sending 500!', er2.stack);
            }
        });

        domain.run(function () {
            next();
        });
    });

    app.use(function (req, res, next) {
        res.locals._ = _;
        app.locals.mainAppUrl = global.config.mainAppUrl;
        app.locals.domainforCookies = global.config.domainForCookie;
        app.locals.baseUrl = global.config.baseUrl;
        next();
    });

    app.use(mobile.isMobile);

    app.use(cookieParser());
    app.use(session({
        name: "mktb:sess",
        secret: ["not", "sure", "what", "it", "is"],
        saveUninitialized: false,
        resave: false,
        domain: config.domainForCookie
    }));

    app.set('port', global.config.port || 3000);
    app.set('views', path.join(global.config.root, 'app/views'));
    app.set('view engine', 'ejs');
    app.use(partials());

    app.use(compress());
    
    app.use(favicon(path.join(global.config.root, 'public/images/favicon.png')));

    app.use(require('express-bunyan-logger')(_.defaults({name: 'request', excludes: ['req', 'res', 'req-headers', 'res-headers', 'user-agent', 'referer', 'body']}, config.logger)));

    app.use(multipart());
    app.use(bodyParser.raw({limit:'50mb',type:["application/octet-stream","image/*"]}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 10000}));
    app.use(methodOverride());

    app.use(require('stylus').middleware(path.join(global.config.root, 'public')));
    app.use('/public', express.static(path.join(global.config.root, 'public')));

    var env = process.env.NODE_ENV || 'development';

    var compileAssets = global.config.environment == "production" || global.config.environment == "stage";

    var connectAssetsOptions = {
        paths: ["public", "public/css", "modules"],
        servePath: 'public'
    }

    if (compileAssets) {
        connectAssetsOptions.build = true;
        connectAssetsOptions.compile = true;
        connectAssetsOptions.compress = true;
        connectAssetsOptions.fingerprinting = true;
    }

    app.use(require('connect-assets')(connectAssetsOptions));

    i18n.configure({
        locales:['en', 'ur'],
        directory: __dirname + '/locales',
        objectNotation : true
    });

    app.use(i18n.init);


    var env = process.env.NODE_ENV || 'development';
    if ('development' === env) {
        app.use(errorHandler());
    }
};
