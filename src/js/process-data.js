'use strict';

import jades from '../generated/js/jades';
import htmls from '../generated/js/htmls';
import templates from '../generated/js/templates';
import descriptions from '../generated/js/descriptions.js';
import includes from '../generated/js/includes.js';
import layouts from '../generated/js/layouts.js';
import references from '../generated/json/references.json';
import helper from './helper';

function highlightCode(obj, language) {
  const keys = Object.keys(obj);

  for ( let key of keys ) {
    obj[key] = helper.highlight(obj[key], 'html');
  }
}

highlightCode(htmls, 'html');

export default {
  jades,
  htmls,
  templates,
  descriptions,
  includes,
  layouts,
  references
};
