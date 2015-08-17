'use strict';

module.exports = function lint(gulp, $, js) {
  return gulp
    .src(js)
    .pipe($.eslint())
    .pipe($.eslint.format());
};
