'use strict';

const jades = require('../generated/js/jades'),
      htmls = require('../generated/js/htmls'),
      templates = require('../generated/js/templates'),
      descriptions = require('../generated/js/descriptions.js'),
      includes = require('../generated/js/includes.js'),
      layouts = require('../generated/js/layouts.js'),
      references = require('../generated/json/references.json'),
      jade = require('jade');

function changeTocStyle(newHash, oldHash) {
  const links = document.querySelectorAll('.toc a');

  [].forEach.call(links, function iterateLink(aEl) {
    const text = aEl.textContent;

    if ( text === oldHash ) {
      aEl.setAttribute('class', '');
    }
    if ( text === newHash ) {
      aEl.setAttribute('class', 'active');
    }
  });
}

function changeContent(newHash) {
  const contentEl = document.querySelector('.content');

  const templateSet = new Set()
          .add('extends')
          .add('includes')
          .add('filters');

  let template = templates.general;

  if ( templateSet.has(newHash) ) {
    template = templates[newHash];
  }

  const html = jade.render(template, {
    obj: JSON.parse(references[newHash]),
    jades,
    htmls,
    descriptions,
    includes,
    layouts,
    doctpe: 'html'
  });

  contentEl.innerHTML = html;
}

module.exports = function router(newHash, oldHash) {
  // change toc style
  changeTocStyle(newHash, oldHash);

  // change content
  changeContent(newHash);
};
