'use strict';

const path = require('path'),
      fs = require('fs');

function files2obj(folderName, outFile) {
  const obj = {};

  const readdir = new Promise(function(res, rej) {
    fs.readdir(folderName, function(err, files) {
      if ( err ) {
        rej(err);
      }

      res(files);
    });
  });

  function readFiles(files) {
    const promises = [];

    files.forEach(function(file) {
      const filePath = path.join(folderName, file);
      const promise = new Promise(function(res, rej) {
        fs.readFile(filePath, 'utf-8', function(err, content) {
          if ( err ) {
            rej(err);
          }

          res([file, content]);
        });
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  }

  function writeFile(contentArrs) {
    let obj = contentArrs.reduce(function(finalObj, contentArr) {
      finalObj[contentArr[0]] = contentArr[1];

      return finalObj;
    }, {});

    obj = `module.exports = ${JSON.stringify(obj)};`;

    const write = new Promise(function(res, rej) {
      fs.writeFile(outFile, obj, function(err) {
        if ( err ) {
          rej(err);
        }

        res();
      });
    });

    return write;
  }

  return readdir
    .then(readFiles)
    .then(writeFile)
    .catch(console.error);
}

module.exports = files2obj;
