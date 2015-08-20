'use strict';

const fs = require('fs'),
      path = require('path');

const test = require('tape'),
      concatJson = require('../gulp-tasks/concat-json');

test('concatJson is a function', function(t) {
  t.equal(typeof concatJson, 'function');

  t.end();
});

test('concatJson concat json files in a folder to one json file.', function(t) {
  const folderPath = './test-data/jsons/',
        filePath = './test-data/jsons.json';

  concatJson(folderPath, filePath);

  const jsonsObj = require(filePath);

  Object.keys(jsonsObj).forEach(function(key) {
    const file = path.join(__dirname, folderPath, `${key}.json`);
    const contentObj = require(file);

    t.deepEqual(JSON.parse(jsonsObj[key]), contentObj[key]);
  });

  t.end();
});
