import delegate from 'delegate-it';
import select from 'select-dom';
import React from 'dom-chef';
import {approvePR, mergePR} from '../../gh-api';

export async function enableApproveMergeShortcuts(): Promise<void> {
  const [org, repo, _, prNumber] = window.location.href.split('/').slice(3);

  delegate<HTMLElement, KeyboardEvent>('html', 'keypress', async (event) => {
    if (isAKeyPressedInBody(event)) {
      const wantApprove = confirm('Approve this PR?');

      if (wantApprove) {
        await approvePR({org, repo, prNumber});
        insertNotificationBanner('Your review was submitted successfully.');
      }
    }

    if (isMKeyPressedInBody(event)) {
      const wantMerge = confirm('Merge this PR?');

      if (wantMerge) {
        await mergePR({org, repo, prNumber});
        insertNotificationBanner('Successfully merged PR');
      }
    }
  });
}

function insertNotificationBanner(text: string): void {
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
        {text}
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

function isMKeyPressedInBody(event: KeyboardEvent): boolean {
  const isKeypressInBody = event.target['tagName'] === 'BODY';
  const isKeypressM = event.code === 'KeyM';

  console.debug({isKeypressInBody, isKeypressM});

  return isKeypressM && isKeypressInBody;
}
