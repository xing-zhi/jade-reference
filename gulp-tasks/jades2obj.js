'use strict';

const path = require('path'),
      fs = require('fs');

const jade = require('jade');

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

function jades2Obj(views, outFile, todo) {
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
      if ( !/.jade$/.test(filename) ) {
        return ;
      }

      const name = path.basename(filename, '.jade'),
            filePath = path.join(views, filename);

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

  function data2module(dataArr) {
    const obj = dataArr.reduce(function(finalObj, dataItem) {
      finalObj[dataItem[0]] = dataItem[1];

      return finalObj;
    }, {});

    const module = `module.exports = ${JSON.stringify(obj)};`;

    return module;
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

  return readdir(views)
    .then(processFiles)
    .then(data2module)
    .then(function(data) {
      writeFile(outFile, data);
    })
    .catch(console.error);
}

module.exports = jades2Obj;
