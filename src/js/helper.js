'use strict';

const highlight = require('highlight.js').highlight;

const helper = {};

helper.highlight = function hl(str, language) {
  return highlight(language, str).value;
};

module.exports = helper;
