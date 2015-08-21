'use strict';

const readdir = require('./readdir'),
      data2module = require('./data2module'),
      writeFile = require('./write-file');

module.exports = {
  readdir,
  data2module,
  writeFile
};
