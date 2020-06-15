import delegate from 'delegate-it';

let currentViewFileCheckbox: HTMLDivElement = null;

export function enableViewingFilesOnVPress(): void {
  document.querySelector('[data-hotkey="v"]').removeAttribute('data-hotkey');

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
