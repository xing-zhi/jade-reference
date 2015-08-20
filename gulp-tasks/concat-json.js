'use strict';

const fs = require('fs'),
      path = require('path');

function concatJson(folderName, outFile) {
  function readdir(folderName) {
    return new Promise(function(res, rej) {
      fs.readdir(folderName, function(err, filenames) {
        if ( err ) {
          rej(err);
        }

        res(filenames);
      });
    });
  }

  function processFiles(filenames) {
    const promises = [];

    filenames.forEach(function processFile(filename) {
      const filePath = path.join(folderName, filename);

      const promise = new Promise(function(res, rej) {
        fs.readFile(filePath, 'utf-8', function(err, content) {
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
    const json =  objArr.reduce(function objs2json(finalJson, obj) {
      return Object.keys(obj).reduce(function processObj(tmpJson, key) {
        tmpJson[key] = JSON.stringify(obj[key]);

        return tmpJson;
      }, finalJson);
    }, {});

    return JSON.stringify(json);
  }

  function writeFile(filePath, data) {
    return new Promise(function(res, rej) {
      fs.writeFile(filePath, data, function(err) {
        if ( err ) {
          rej(err);
        }

        res();
      });
    });
  }

  return readdir(folderName)
    .then(processFiles)
    .then(data2jsonStr)
    .then(function(data) {
      writeFile(outFile, data);
    })
    .catch(console.error);
}

module.exports = concatJson;
