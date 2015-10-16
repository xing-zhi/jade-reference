'use strict';

import jade from 'jade';

import router from './router';
import helper from './helper';
import appData from './process-data';

window.addEventListener('DOMContentLoaded', function onLoad() {
  const hash = location.hash.substr(1);

  if ( hash ) {
    router(hash, '', appData);
  }

  window.addEventListener('hashchange', function onHashchange(e) {
    const oldHash = e.oldURL.replace(/^[^#]*#/, ''),
          newHash = e.newURL.replace(/^[^#]*#/, '');

    router(newHash, oldHash, appData);
  });

  document.addEventListener('input', function onInput(e) {
    const target = e.target,
          text = target.textContent || target.innerText,
          htmlContainer = target.parentNode.parentNode.querySelector('.html'),
          html = jade.render(text, {
            pretty: true
          }).trim();

    htmlContainer.innerHTML = helper.highlight(html, 'html');
  });
});
