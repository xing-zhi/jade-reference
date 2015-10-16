'use strict';

import highlightjs from 'highlight.js';

const highlight = highlightjs.highlight,
      helper = {};

helper.highlight = (str, language) => highlight(language, str).value;

helper.renderTemplate = function(hash, datas) {
  const templates = datas.templates,
        templateSet = new Set()
          .add('extends')
          .add('includes')
          .add('filters');

  let html;

  if ( localStorage.getItem(`rendered-${hash}`) ) {
    html = localStorage.getItem(`rendered-${hash}`);
  } else {
    let templateName = 'general';

    if ( templateSet.has(hash) ) {
      templateName = hash;
    }

    const template = templates[templateName],
          templateFunc = new Function(`return ${template}`)();    // jshint ignore: line

    html = templateFunc({
      syntaxObj: JSON.parse(datas.references[hash]),
      jades: datas.jades,
      htmls: datas.htmls,
      includes: datas.includes,
      layouts: datas.layouts,
      doctpe: 'html'
    });

    localStorage.setItem(`rendered-${hash}`, html);
  }

  return html;
};

export default helper;
