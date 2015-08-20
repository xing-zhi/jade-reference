'use strict';

const fs = require('fs'),
      path = require('path');

const test = require('tape'),
      jade = require('jade');

const jades2obj = require('../gulp-tasks/jades2obj.js');

const jadesPath = path.join(__dirname, 'test-data/jade-snippets');

function clearGeneratedData(filePath) {
  fs.unlink(filePath);
}

test('jades2obj is a function', function(t) {
  t.equal(typeof jades2obj, 'function');

  t.end();
});

test('just concat jade files to a module. ', function(t) {
  const filePath = path.join(__dirname, 'test-data/jades.js');

  jades2obj(jadesPath, filePath, 'intact');

  const jadesObj = require(filePath);

  t.equal(typeof jadesObj, 'object');

  Object.keys(jadesObj).forEach(function(key) {
    const file = path.join(jadesPath, `${key}.jade`);

    fs.readFile(file, 'utf-8', function(err, content) {
      if ( err ) {
        console.error(err);
        t.fail();
      }
      t.equal(jadesObj[key], content);
    });
  });

  clearGeneratedData(filePath);

  t.end();
});

test('compile jade files and concat the result to a module', function(t) {
  const filePath = path.join(__dirname, 'test-data/templates.js');

  jades2obj(jadesPath, filePath, 'compile', {highlight: false});

  const templatesObj = require(filePath);

  t.equal(typeof templatesObj, 'object');

  Object.keys(templatesObj).forEach(function(key) {
    const file = path.join(jadesPath, `${key}.jade`);

    fs.readFile(file, 'utf-8', function(err, content) {

      const template = jade.compileClient(content, {
        debug: false,
        compileDebug: true,
        filename: file,
        doctype: 'html'
      }).trim();

      t.equal(templatesObj[key], template);
    });
  });

  clearGeneratedData(filePath);
  t.end();
});

test('render jade files and concat the result to a module', function(t) {
  const filePath = path.join(__dirname, 'test-data/htmls.js');

  jades2obj(jadesPath, filePath, 'render', {highlight: false});

  const htmlsObj = require(filePath);

  t.equal(typeof htmlsObj, 'object');

  Object.keys(htmlsObj).forEach(function(key) {
    const file = path.join(jadesPath, `${key}.jade`);

    fs.readFile(file, 'utf-8', function(err, content) {

      const html = jade.render(content, {
        debug: false,
        compileDebug: true,
        filename: file,
        pretty: true,
        doctype: 'html'
      }).trim();

      t.equal(htmlsObj[key], html);
    });
  });

  clearGeneratedData(filePath);
  t.end();
});
