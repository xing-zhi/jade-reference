'use strict';

import hljs from 'highlight-redux';

hljs.registerLanguage('html', require('highlight-redux/lib/languages/xml'));

const helper = {};

helper.highlight = function(str) {
  const preNode = document.createElement('pre'),
        textNode = document.createTextNode(str);

  preNode.appendChild(textNode);

  hljs.highlightBlock(preNode);
  return preNode.innerHTML;
};

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
