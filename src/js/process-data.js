'use strict';

const jades = require('../generated/js/jades'),
      htmls = require('../generated/js/htmls'),
      templates = require('../generated/js/templates'),
      descriptions = require('../generated/js/descriptions.js'),
      includes = require('../generated/js/includes.js'),
      layouts = require('../generated/js/layouts.js'),
      references = require('../generated/json/references.json'),
      helper = require('./helper');

function highlightCode(obj, language) {
  for ( let key in obj ) {
    if ( obj.hasOwnProperty(key) ) {
      obj[key] = helper.highlight(obj[key], 'html');
    }
  }
}

(function() {
  highlightCode(htmls, 'html');
})();

module.exports = {
  jades,
  htmls,
  templates,
  descriptions,
  includes,
  layouts,
  references
};
