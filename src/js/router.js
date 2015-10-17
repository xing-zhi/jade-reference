'use strict';

import helper from './helper';

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

function changeContent(newHash, appData) {
  const contentEl = document.querySelector('.content'),
        html = helper.renderTemplate(newHash, appData);

  contentEl.innerHTML = html;

  [].forEach.call(contentEl.querySelectorAll('.html'), function(el) {
    console.log(el.textContent);
    el.innerHTML = helper.highlight(el.textContent || el.innerText);
  });
}

export default function router(newHash, oldHash, appData) {
  // change toc style
  changeTocStyle(newHash, oldHash);

  // change content
  changeContent(newHash, appData);
}
