import delegate from 'delegate-it';
import select from 'select-dom';
import domLoaded from 'dom-loaded';
import OptionsSync from 'webext-options-sync';
import {Options} from '../../types';

export async function enableApprovingPROnAPress(): Promise<void> {
  const [org, repo, _, prNumber] = window.location.href.split('/').slice(3);

  delegate<HTMLElement, KeyboardEvent>('html', 'keypress', async (event) => {
    if (!isAKeyPressedInBody(event)) {
      return;
    }

    const wantApprove = confirm('Approve this PR?');

    if (wantApprove) {
      const authHeader = await getAuthHeader();
      await approvePR({org, repo, prNumber, authHeader});
    }
  });
}

function isAKeyPressedInBody(event: KeyboardEvent): boolean {
  const isKeypressInBody = event.target['tagName'] === 'BODY';
  const isKeypressA = event.code === 'KeyA';

  console.debug({isKeypressInBody, isKeypressA});

  return isKeypressA && isKeypressInBody;
}

async function getAuthHeader(): string {
  const optionsStorage = new OptionsSync<Options>();
  const {ghToken} = await optionsStorage.getAll();
  console.info('ghToken', ghToken);

  await domLoaded;
  const username = select<HTMLMetaElement>('meta[name="user-login"]').getAttribute('content');

  return `Basic ${btoa(`${username}:${ghToken}`)}`;
}

async function approvePR({org, repo, prNumber, authHeader}): void {
  const resp = await fetch(
    `https://api.github.com/repos/${org}/${repo}/pulls/${prNumber}/reviews`,
    {
      method: 'POST',
      headers: {
        Authorization: authHeader,
      },
      body: JSON.stringify({
        event: 'APPROVE',
      }),
    }
  );

  return resp.json();
}
