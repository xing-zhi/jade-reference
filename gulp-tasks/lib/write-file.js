'use strict';

const fs = require('fs');

module.exports = function(filename, data) {
  return new Promise(function(res, rej) {
    fs.writeFile(filename, data, function(err) {
      if ( err ) {
        rej(err);
      }

      res();
    });
  });
};
