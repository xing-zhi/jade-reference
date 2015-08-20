'use strict';

const fs = require('fs');

module.exports = function(dirname) {
  return new Promise(function(res, rej) {
    fs.readdir(dirname, function(err, filenames) {
      if ( err ) {
        rej(err);
      }

      res(filenames);
    });
  });
};
