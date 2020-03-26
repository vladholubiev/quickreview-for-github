import {AnyAction} from './types';
import {approvePR, mergePR} from './gh-api';

chrome.runtime.onMessage.addListener(async (message: AnyAction, {tab}, sendResponse) => {
  console.log('got background message', message);

  if (message.action === 'open-urls') {
    for (const [i, url] of message.params.urls.entries()) {
      chrome.tabs.create({
        url,
        index: tab!.index + i + 1,
        active: true,
      });
    }

    sendResponse({});
  }

  if (message.action === 'approve-pr') {
    try {
      const resp = await approvePR(message.params);
      console.log('approve response', resp);
    } catch (error) {
      console.log('approve error', error);

      sendResponse({error: `❌ ${error.message}`});

      return true;
    }

    sendResponse({});
  }

  if (message.action === 'merge-pr') {
    try {
      const resp = await mergePR(message.params);
      console.log('merge response', resp);
    } catch (error) {
      console.error('merge error', error);

      sendResponse({error: `❌ ${error.message}`});

      return true;
    }

    sendResponse({});
  }

  return true;
});
