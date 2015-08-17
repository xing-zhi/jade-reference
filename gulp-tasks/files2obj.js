'use strict';

const path = require('path'),
      fs = require('fs');

function files2obj(folderName, outFile) {
  const obj = {};
  const files = fs.readdirSync(folderName);

  files.forEach(function file2property(filename) {
    const filePath = path.join(folderName, filename),
          fileContent = fs.readFileSync(filePath, 'utf-8');

    obj[filename] = fileContent;
  });

  const outCome = `module.exports = ${JSON.stringify(obj)};`;

  fs.writeFileSync(outFile, outCome);
}

module.exports = files2obj;
