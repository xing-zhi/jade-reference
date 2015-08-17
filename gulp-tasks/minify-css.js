'use strict';

module.exports = function minifyCss(gulp, $, cfg) {
    return gulp.src(cfg.src)
    .pipe($.minifyCss())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(cfg.dest));
};
