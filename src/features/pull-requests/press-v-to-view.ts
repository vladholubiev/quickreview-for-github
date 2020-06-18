import delegate from 'delegate-it';
import elementReady from 'element-ready';

let currentViewFileCheckbox: HTMLDivElement = null;

export async function enableViewingFilesOnVPress(): Promise<void> {
  delegate<HTMLElement, KeyboardEvent>('html', 'keypress', event => {
    if (!isVKeyPressedInBody(event)) {
      return;
    }

    currentViewFileCheckbox?.click();
  });

  delegate<HTMLDivElement, MouseEvent>('#files', 'mouseover', setCurrentViewFileCheckbox);

  await elementReady('[data-hotkey="v"]');

  const vHotKeyEl = document.querySelector('[data-hotkey="v"]');

  if (vHotKeyEl) {
    vHotKeyEl.removeAttribute('data-hotkey');
    console.debug('Removed V key binding from "Review Changes" box');
  }
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
