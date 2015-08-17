'use strict';

module.exports = function sass(gulp, $, cfg) {
  return $.rubySass(cfg.src, {
    compass: true,
    sourcemap: true
  })
    .pipe($.autoprefixer())
    .on('error', function onError(err) {
      console.error(`Error: ${err.message}`);
    })
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(cfg.dest))
    .pipe($.livereload());
};
