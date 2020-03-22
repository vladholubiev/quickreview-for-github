import delegate from 'delegate-it/index.js';

let currentViewFileCheckbox: HTMLDivElement = null;

function init() {
  delegate<HTMLElement, KeyboardEvent>('html', 'keypress', event => {
    if (!isVKeyPressedInBody(event)) {
      return;
    }

    currentViewFileCheckbox?.click();
  });

  delegate<HTMLDivElement, MouseEvent>('#files', 'mouseover', setCurrentViewFileCheckbox);
}

function isVKeyPressedInBody(event: KeyboardEvent): boolean {
  const isKeypressInBody = event.target['tagName'] === 'BODY';
  const isKeypressV = event.code === 'KeyV';

  console.debug({isKeypressInBody, isKeypressV});

  return isKeypressV && isKeypressInBody;
}

function setCurrentViewFileCheckbox(event: MouseEvent): void {
  const viewFileForm = (event.target as HTMLDivElement)
    .closest('.file')
    ?.querySelector('form.js-toggle-user-reviewed-file-form');

  currentViewFileCheckbox = viewFileForm?.querySelector('input[type=checkbox]');
  console.debug('currentViewFileCheckbox', currentViewFileCheckbox);
}

init();
