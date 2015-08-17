'use strict';

const jade = require('jade'),
      highlight = require('highlight.js').highlight;

const router = require('./router');

window.addEventListener('DOMContentLoaded', function onLoad() {
  const hash = location.hash.substr(1);

  if ( hash ) {
    router(hash, '');
  }

  window.addEventListener('hashchange', function onHashchange(e) {
    const oldHash = e.oldURL.replace(/^[^#]*#/, ''),
          newHash = e.newURL.replace(/^[^#]*#/, '');

    router(newHash, oldHash);
  });

  document.addEventListener('input', function onInput(e) {
    const target = e.target,
          text = target.innerText,
          htmlContainer = target.parentNode.parentNode.querySelector('.html'),
          html = jade.render(text, {
            pretty: true
          }).trim();

    htmlContainer.innerHTML = highlight('html', html).value;
  });
});
