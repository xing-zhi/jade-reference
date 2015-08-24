'use strict';

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
  const templates = appData.templates,
        contentEl = document.querySelector('.content');

  const templateSet = new Set()
          .add('extends')
          .add('includes')
          .add('filters');

  let template = templates.general;

  if ( templateSet.has(newHash) ) {
    template = templates[newHash];
  }

  /* eslint no-new-func:0 */
  const templateFunc = new Function(`return ${template}`)();

  const html = templateFunc({
    obj: JSON.parse(appData.references[newHash]),
    jades: appData.jades,
    htmls: appData.htmls,
    descriptions: appData.descriptions,
    includes: appData.includes,
    layouts: appData.layouts,
    doctpe: 'html'
  });

  contentEl.innerHTML = html;
}

export default function router(newHash, oldHash, appData) {
  // change toc style
  changeTocStyle(newHash, oldHash);

  // change content
  changeContent(newHash, appData);
}
