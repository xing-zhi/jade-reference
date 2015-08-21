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

  function ckeck() {
    const filesObj = require(filePath);
    const promises = [];
    Object.keys(filesObj).forEach(function(key) {
      const file = path.join(folderPath, key);

      const promise = new Promise(function(res, rej) {
        fs.readFile(file, 'utf-8', function(err, content) {
          if ( err ) {
            rej(err);
            t.fail();
          }

          res();
          t.equal(filesObj[key], content);
        });
      });

      promises.push(promise);
    });

    return promises;
  }

  files2obj(folderPath, filePath)
    .then(ckeck)
    .then(function() {
      clearGeneratedData(filePath);
    })
    .catch(console.error);

  t.end();
});
