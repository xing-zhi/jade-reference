'use strict';

const path = require('path'),
      fs = require('fs');

const lib = require('./lib');

function files2obj(dirname, destFile) {
  const readdir = lib.readdir,
        stringifyData = lib.stringifyData,
        writeFile = lib.writeFile;

  function processFiles(filenames) {
    const promises = [];

    filenames.forEach(function processFile(filename) {
      const filePath = path.join(dirname, filename);

      const promise = new Promise(function promiseDef(res, rej) {
        fs.readFile(filePath, 'utf-8', function readFile(err, content) {
          if ( err ) {
            rej(err);
          }

          res([filename, content]);
        });
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  }

  return readdir(dirname)
    .then(processFiles)
    .then(stringifyData)
    .then(function stepWriteFile(data) {
      writeFile(destFile, data);
    })
    .catch(console.error);
}

module.exports = files2obj;
