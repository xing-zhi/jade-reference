'use strict';

module.exports = function clean(gulp, $, cfg) {
  return gulp.src(cfg.src, {read: false})
    .pipe($.ignore(cfg.ignore))
    .pipe($.rimraf());
};
