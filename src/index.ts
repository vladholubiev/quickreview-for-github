import delegate from 'delegate-it/index.js';

function init() {
  delegate<HTMLTextAreaElement, KeyboardEvent>('html', 'keypress', event => {
    console.info(event);
  });
}

init();
