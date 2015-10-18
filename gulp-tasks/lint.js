'use strict';

module.exports = function lint(gulp, $, js) {
  return gulp
    .src(js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs())
    .pipe($.jscsStylish())
    .pipe($.jscs.reporter('fail'));
};
