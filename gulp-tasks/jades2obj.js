'use strict';

const path = require('path'),
      fs = require('fs');

const jade = require('jade'),
      highlight = require('highlight.js').highlight;

function render(fileContent, filePath, options) {
  const html = jade.render(fileContent, {
    debug: false,
    compileDebug: true,
    filename: filePath,
    pretty: true,
    doctype: 'html'
  }).trim();

  return options.highlight ? highlight('html', html).value : html;
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

function jades2Obj(views, outFile, todo, options) {
  const obj = {};
  const files = fs.readdirSync(views);

  files.forEach(function file2property(filename) {
    if ( /.jade$/.test(filename) ) {
      const name = path.basename(filename, '.jade'),
            filePath = path.join(views, filename),
            fileContent = fs.readFileSync(filePath, 'utf-8');

      obj[name] = todosMap.get(todo)(fileContent, filePath, options);
    }
  });

  const outCome = `module.exports = ${JSON.stringify(obj)};`;

  fs.writeFileSync(outFile, outCome);
}

module.exports = jades2Obj;
