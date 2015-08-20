'use strict';

const fs = require('fs'),
      path = require('path');

function concatJson(filePath, outFile) {
  const files = fs.readdirSync(filePath);

  let json = files.reduce(function file2obj(finalJson, filename) {
    const file = path.join(filePath, filename);
    const content = fs.readFileSync(file, 'utf-8');
    const obj = JSON.parse(content);

    return Object.keys(obj).reduce(function stringify(tmpJson, key) {
      tmpJson[key] = JSON.stringify(obj[key]);

      return tmpJson;
    }, finalJson);
  }, {});

  json = JSON.stringify(json);

  fs.writeFileSync(outFile, json);
}

module.exports = concatJson;
