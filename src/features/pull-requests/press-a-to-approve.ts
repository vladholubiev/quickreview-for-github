import delegate from 'delegate-it';
import {approvePR} from '../../gh-api';

export async function enableApprovingPROnAPress(): Promise<void> {
  const [org, repo, _, prNumber] = window.location.href.split('/').slice(3);

  delegate<HTMLElement, KeyboardEvent>('html', 'keypress', async (event) => {
    if (!isAKeyPressedInBody(event)) {
      return;
    }

    const wantApprove = confirm('Approve this PR?');

    if (wantApprove) {
      await approvePR({org, repo, prNumber});
    }
  });
}

function isAKeyPressedInBody(event: KeyboardEvent): boolean {
  const isKeypressInBody = event.target['tagName'] === 'BODY';
  const isKeypressA = event.code === 'KeyA';

  console.debug({isKeypressInBody, isKeypressA});

  return isKeypressA && isKeypressInBody;
}
