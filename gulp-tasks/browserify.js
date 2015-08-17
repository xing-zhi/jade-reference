'use strict';

const source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      browserify = require('browserify');

module.exports = function (gulp, $, cfg) {
  return browserify(cfg.src)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
// uglify对es6特性的支持不够，解析错误，故暂时不使用
//    .pipe($.uglify().on('error', $.util.log))
    .pipe(gulp.dest(cfg.dest));
};
