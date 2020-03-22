import delegate from 'delegate-it';
import select from 'select-dom';

export function enableApprovingPROnAPress(): void {
  delegate<HTMLElement, KeyboardEvent>('html', 'keypress', event => {
    if (!isAKeyPressedInBody(event)) {
      return;
    }

    if (!select.exists('#submit-review button[value=approve]')) {
      return;
    }

    const wantApprove = confirm('Approve this PR?');

    if (wantApprove) {
      select<HTMLButtonElement>('#submit-review button[value=approve]')?.click();
    }
  });
}

function isAKeyPressedInBody(event: KeyboardEvent): boolean {
  const isKeypressInBody = event.target['tagName'] === 'BODY';
  const isKeypressA = event.code === 'KeyA';

  console.debug({isKeypressInBody, isKeypressA});

  return isKeypressA && isKeypressInBody;
}
