import delegate from 'delegate-it';
import select from 'select-dom';
import React from 'dom-chef';
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
      insertNotificationBanner();
    }
  });
}

function insertNotificationBanner() {
  select('#js-flash-container').append(
    <div class="flash flash-full flash-notice">
      <div class="container-lg px-2">
        <button class="flash-close js-flash-close" type="button" aria-label="Dismiss this message">
          <svg
            class="octicon octicon-x"
            viewBox="0 0 12 16"
            version="1.1"
            width="12"
            height="16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"
            ></path>
          </svg>
        </button>
        Your review was submitted successfully.
      </div>
    </div>
  );
}

function isAKeyPressedInBody(event: KeyboardEvent): boolean {
  const isKeypressInBody = event.target['tagName'] === 'BODY';
  const isKeypressA = event.code === 'KeyA';

  console.debug({isKeypressInBody, isKeypressA});

  return isKeypressA && isKeypressInBody;
}
