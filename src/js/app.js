'use strict';

import jade from 'jade';

import router from './router';
import helper from './helper';

window.addEventListener('DOMContentLoaded', function onLoad() {
  const hash = location.hash.substr(1),
        appData = {};

  if ( hash ) {
    router(hash, '', appData);
  }

  function loadDatas() {
    const ajax = helper.ajax,
          dataFiles = new Set()
            .add('jades.js')
            .add('htmls.js')
            .add('templates.js')
            .add('includes.js')
            .add('layouts.js')
            .add('references.json');

    for ( let fileName of dataFiles.keys() ) {
      ajax(`datas/${fileName}`)
        .then(function(data) {
          const dataKey = fileName.split('.')[0];
          appData[dataKey] = data;
        })
        .catch(function(e) {
          console.error(e);
        });    // jshint ignore: line
    }
  }

  loadDatas();

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

    htmlContainer.innerHTML = helper.highlight(html);
  });
});
