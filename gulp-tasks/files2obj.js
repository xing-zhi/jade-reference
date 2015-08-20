'use strict';

const path = require('path'),
      fs = require('fs');

const lib = require('./lib');

function files2obj(dirname, destFile) {
  const readdir = lib.readdir,
        data2module = lib.data2module,
        writeFile = lib.writeFile;

  function processFiles(filenames) {
    const promises = [];

    filenames.forEach(function(filename) {
      const filePath = path.join(dirname, filename);

      const promise = new Promise(function(res, rej) {
        fs.readFile(filePath, 'utf-8', function(err, content) {
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
    .then(data2module)
    .then(function(data) {
      writeFile(destFile, data);
    })
    .catch(console.error);
}

module.exports = files2obj;
