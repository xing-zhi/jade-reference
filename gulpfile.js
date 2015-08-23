'use strict';

const path = require('path');

const gulp = require('gulp'),
      loadPlugins = require('gulp-load-plugins'),
      runSequence = require('run-sequence');

const cfg = require('./config.json'),
      jades2Obj = require('./gulp-tasks/jades2obj'),
      files2obj = require('./gulp-tasks/files2obj'),
      concatJson = require('./gulp-tasks/concat-json');

const $ = loadPlugins();

function getTask(taskName, taskCfg) {
  const taskPath = path.join(__dirname, cfg.gulpTasks, taskName);

  taskCfg = taskCfg || cfg;

  return require(taskPath).bind(null, gulp, $, taskCfg);
}

gulp.task('lint', getTask('lint', cfg.js.lint));
gulp.task('sass', getTask('sass', cfg.css.sass));
gulp.task('minifyCss', getTask('minify-css', cfg.css.minify));
gulp.task('copyCss', getTask('copy', cfg.css.copy));
gulp.task('cleanCss', getTask('clean', cfg.css.clean));
gulp.task('cleanJs', getTask('clean', cfg.js.clean));
gulp.task('copyJs', getTask('copy', cfg.js.copy));

gulp.task('browserify', getTask('browserify', cfg.browserify));

// generate objects
gulp.task('generateJadesObj', function() {
  jades2Obj(cfg.data.jades, cfg.data.jadesObj, 'intact');
});
gulp.task('generateHtmlsObj', function() {
  jades2Obj(cfg.data.jades2render, cfg.data.htmlsObj, 'render');
});
gulp.task('generateTemplatesObj', function() {
   jades2Obj(cfg.data.templates, cfg.data.templatesObj, 'compile');
});
gulp.task('generateDescriptionsObj', function() {
  jades2Obj(cfg.data.desciptionsJade, cfg.data.descriptionsObj, 'render');
});
gulp.task('generateLayoutsObj', function() {
   jades2Obj(cfg.data.layouts, cfg.data.layoutsObj, 'intact');
});
gulp.task('generateIncludesObj', function() {
  files2obj(cfg.data.includes, cfg.data.includesObj);
});
// \generate objects

gulp.task('concatJson', function() {
  concatJson(cfg.concatJson.src, cfg.concatJson.dest);
});

gulp.task('generateData', ['generateJadesObj', 'generateHtmlsObj', 'generateTemplatesObj', 'generateDescriptionsObj', 'generateIncludesObj', 'generateLayoutsObj']);

gulp.task('build:css', function() {
  runSequence('cleanCss', 'sass', 'minifyCss', 'copyCss');
});

gulp.task('build:js', function() {
  runSequence('cleanJs', 'concatJson', 'generateData', 'browserify', 'copyJs');
});

gulp.task('build', ['build:css', 'build:js']);

gulp.task('watch:css', ['build:css'], function() {
  $.livereload.listen();
  gulp.watch(cfg.css.watch, ['build:css']);
});

gulp.task('watch:js', ['build:js'], function() {
  $.livereload.listen();
  gulp.watch(cfg.js.build, ['build:js']);
});

gulp.task('watch:lint', ['lint'], function() {
  gulp.watch(cfg.js.lint, ['lint']);
});
