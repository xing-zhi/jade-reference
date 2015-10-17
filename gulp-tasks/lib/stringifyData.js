'use strict';

module.exports = function(dataArr) {
  const obj = dataArr.reduce(function(finalObj, dataItem) {
    finalObj[dataItem[0]] = dataItem[1];

    return finalObj;
  }, {});

  const module = JSON.stringify(obj);

  return module;
};
