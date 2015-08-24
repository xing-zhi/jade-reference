'use strict';

const fs = require('fs'),
      path = require('path');

const lib = require('./lib');

function concatJson(dirname, destFile) {
  const readdir = lib.readdir,
        writeFile = lib.writeFile;

  function processFiles(filenames) {
    const promises = [];

    filenames.forEach(function processFile(filename) {
      const filePath = path.join(dirname, filename);

      const promise = new Promise(function processDef(res, rej) {
        fs.readFile(filePath, 'utf-8', function readFile(err, content) {
          if ( err ) {
            rej(err);
          }

          res(JSON.parse(content));
        });
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  }

  function data2jsonStr(objArr) {
    const json = objArr.reduce(function objs2json(finalJson, obj) {
      return Object.keys(obj).reduce(function processObj(tmpJson, key) {
        tmpJson[key] = JSON.stringify(obj[key]);

        return tmpJson;
      }, finalJson);
    }, {});

    return JSON.stringify(json);
  }

  return readdir(dirname)
    .then(processFiles)
    .then(data2jsonStr)
    .then(function stepWriteFile(data) {
      writeFile(destFile, data);
    })
    .catch(console.error);
}

module.exports = concatJson;
