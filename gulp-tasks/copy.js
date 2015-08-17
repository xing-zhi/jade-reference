'use strict';

module.exports = function copy(gulp, $, cfg) {
  return gulp
    .src(cfg.src)
    .pipe(gulp.dest(cfg.dest))
    .pipe($.livereload());
};
