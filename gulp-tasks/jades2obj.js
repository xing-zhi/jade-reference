'use strict';

const path = require('path'),
      fs = require('fs');

const jade = require('jade');

const lib = require('./lib');

function render(fileContent, filePath) {
  return jade.render(fileContent, {
    debug: false,
    compileDebug: true,
    filename: filePath,
    pretty: true,
    doctype: 'html'
  }).trim();
}

function compile(fileContent, filePath) {
  return jade.compileClient(fileContent, {
    debug: false,
    compileDebug: true,
    filename: filePath,
    doctype: 'html'
  });
}

function intact(fileContent) {
  return fileContent;
}

const todosMap = new Map()
        .set('render', render)
        .set('compile', compile)
        .set('intact', intact);

function jades2Obj(dirname, destFile, todo) {
  const readdir = lib.readdir,
        data2module = lib.data2module,
        writeFile = lib.writeFile;

  function processFiles(filenames) {
    const promises = [];

    filenames.forEach(function processFile(filename) {
      if ( !/.jade$/.test(filename) ) {
        return ;
      }

      const name = path.basename(filename, '.jade'),
            filePath = path.join(dirname, filename);

      const promise = new Promise(function(res, rej) {
        fs.readFile(filePath, 'utf-8', function(err, content) {
          if ( err ) {
            rej(err);
          }

          const data = todosMap.get(todo)(content, filePath);

          res([name, data]);
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

module.exports = jades2Obj;
