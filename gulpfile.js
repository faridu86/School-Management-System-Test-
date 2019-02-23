var gulp = require('gulp'),
    path = require('path'),
    fs = require('fs'),
    plugins = require('gulp-load-plugins')(),
    mergeStream = require('merge-stream'),
    async = require('async'),
    webpack = require('webpack');

var isProduction = plugins.util.env.prod,
    debug        = plugins.util.env.debug;

function getAppDirectories(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  }).map(function(folder) {
    return path.join(dir, folder);
  });
}

function runWebpack(webpackConfig, webpackConfigPath, callback) {
  // run webpack
  webpack(webpackConfig, function(err, stats) {
    if(err) throw err
    if (stats.hasErrors()) {
      var jsonStats = stats.toJson();
      console.log(jsonStats.errors);
      var error = "Webpack failed for " +  webpackConfigPath;
      throw error;
    }
    callback(err, stats);
  });
}

function requireIfExists(name) {
  try {
    var module = require(name);
    return module;
  } catch(e) {
    return false;
  }
}

gulp.task('default', ['build']);

if(isProduction)
  gulp.task('build', plugins.sequence(['bower', 'clone-index'], 'webpack', 'uglify'));
else
  gulp.task('build', plugins.sequence(['bower', 'clone-index'], 'webpack'));


gulp.task('clone-index', function() {
  return gulp.src('client/common/index.html').pipe(gulp.dest('public/client/'));
})

gulp.task('bower', function() {
  return gulp.src([ 'client/package.json']).pipe(plugins.install());
});

gulp.task('webpack', function(done) {
  var clientAppDirectories = getAppDirectories("./client");

  async.eachSeries(clientAppDirectories, function(appDirectory, callback) {
    var webpackConfigPath = path.join(__dirname, appDirectory, "webpack.config.js");
    var webpackConfig = requireIfExists(webpackConfigPath);
    if (webpackConfig) {
      webpackConfig.bail = true; // stop build on first failure
      webpackConfig.devtool = isProduction ? '' : 'source-map';
      runWebpack(webpackConfig, webpackConfigPath, function() {
        callback();
      });
    } else {
      callback();
    }
  }, function(err, results) {
    if (err) console.log(err);
    done();
  });
});

gulp.task('uglify', function() {
  var mergedStreams = mergeStream();
  var clientAppDirectories = getAppDirectories('./public/client');
  clientAppDirectories.map(function(appDirectory) {
    var stream = gulp.src(path.join(appDirectory, '*.js'))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify({ mangle: false }))
      .pipe(gulp.dest(appDirectory));
    mergedStreams.add(stream);
  });
  return mergedStreams;
});
