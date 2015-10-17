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

helper.ajax = function(url) {
  return new Promise(function(resolve, reject) {
    if ( localStorage.getItem(url) ) {
      resolve(JSON.parse(localStorage.getItem(url)));
    } else {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);

      xhr.addEventListener('load', function() {
        if ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ) {
          localStorage.setItem(url, xhr.responseText);
          resolve(JSON.parse(xhr.responseText));
        }
      });

      xhr.addEventListener('error', function(e) {
        reject(e);
      });

      xhr.send();
    }
  });
};

export default helper;
