'use strict';

const fs = require('fs'),
      path = require('path');

function concatJson(filePath, outFile) {
  const files = fs.readdirSync(filePath);

  let json = files.reduce(function file2obj(finalJson, filename) {
    const content = fs.readFileSync(path.join(__dirname, '../', filePath, filename), 'utf-8');
    const obj = JSON.parse(content);

    return Object.keys(obj).reduce(function stringify(tmpJson, key) {
      tmpJson[key] = JSON.stringify(obj[key]);

      return tmpJson;
    }, finalJson);
  }, {});

  json = JSON.stringify(json);

  fs.writeFile(path.join(__dirname, '../', outFile), json);
}

module.exports = concatJson;
