'use strict';

const fs = require('fs'),
      path = require('path');

const test = require('tape'),
      files2obj = require('../gulp-tasks/files2obj');

function clearGeneratedData(filename) {
  fs.unlink(filename);
}

test('files2obj is a function', function(t) {
  t.equal(typeof files2obj, 'function');

  t.end();
});

test('files2obj concat files in a particular folder to a module.', function(t) {
  const folderPath = path.join(__dirname, 'test-data/files'),
        filePath = path.join(__dirname, 'test-data/files.js');

  files2obj(folderPath, filePath);

  const filesObj = require(filePath);

  Object.keys(filesObj).forEach(function(key) {
    const file = path.join(folderPath, key);

    console.log(file);

    fs.readFile(file, 'utf-8', function(err, content) {
      if ( err ) {
        console.error(err);
        t.fail();
      }

      t.equal(filesObj[key], content);
    });
  });

  clearGeneratedData(filePath);

  t.end();
});
