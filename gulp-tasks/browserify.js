'use strict';

module.exports = function browserify(gulp, $, cfg) {
  return gulp
    .src(cfg.src)
    .pipe($.browserify({
      debug: true
    }))
    .pipe(gulp.dest(cfg.dest));
};
