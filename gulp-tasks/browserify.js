'use strict';

const source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      browserify = require('browserify'),
      babelify = require('babelify');

module.exports = function(gulp, $, cfg) {
  return browserify(cfg.src)
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.uglify().on('error', $.util.log))
    .pipe($.sourcemaps.write('./'))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(cfg.dest));
};
