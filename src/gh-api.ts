import OptionsSync from 'webext-options-sync';
import domLoaded from 'dom-loaded';
import select from 'select-dom';
import {Options} from './types';

export async function approvePR({
  org,
  repo,
  prNumber,
}: {
  org: string;
  repo: string;
  prNumber: string;
}): Promise<any> {
  const authHeader = await getAuthHeader();

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

async function getAuthHeader(): Promise<string> {
  const optionsStorage = new OptionsSync<Options>();
  const {ghToken} = await optionsStorage.getAll();

  if (!ghToken) {
    alert('Please set Personal token first!');

    chrome.runtime.sendMessage({
      openURLs: [`chrome://extensions/?options=${chrome.runtime.id}`],
    });
  }

  await domLoaded;
  const username = select<HTMLMetaElement>('meta[name="user-login"]').getAttribute('content');

  return `Basic ${btoa(`${username}:${ghToken}`)}`;
}
