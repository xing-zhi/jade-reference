'use strict';

import highlightjs from 'highlight.js';

const highlight = highlightjs.highlight,
      helper = {};

helper.highlight = (str, language) => highlight(language, str).value;

export default helper;
