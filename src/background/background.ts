import {AnyAction} from '../types';
import {approvePR, mergePR} from './gh-api';

chrome.runtime.onMessage.addListener((message: AnyAction, sender, sendResponse) => {
  messageHandler(message, sender, sendResponse);

  return true;
});

async function messageHandler(
  message: AnyAction,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  console.log('got background message', message);

  if (message.action === 'approve-pr') {
    try {
      const resp = await approvePR(message.params);
      console.log('approve response', resp);
    } catch (error) {
      console.log('approve error', error);

      return sendResponse({error: `❌ ${error.message}`});
    }

    return sendResponse({});
  }

  if (message.action === 'merge-pr') {
    try {
      const resp = await mergePR(message.params);
      console.log('merge response', resp);
    } catch (error) {
      console.error('merge error', error);

      return sendResponse({error: `❌ ${error.message}`});
    }

    return sendResponse({});
  }
}
