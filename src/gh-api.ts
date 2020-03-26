import OptionsSync from 'webext-options-sync';
import {OpenURLsAction, Options} from './types';

export async function approvePR({
  org,
  repo,
  prNumber,
  username,
}: {
  org: string;
  repo: string;
  prNumber: string;
  username: string;
}): Promise<any> {
  const authHeader = await getAuthHeader(username);

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

  if (!resp.ok) {
    const {message} = await resp.json();
    throw new Error(message);
  }

  return resp.json();
}

export async function mergePR({
  org,
  repo,
  prNumber,
  username,
}: {
  org: string;
  repo: string;
  prNumber: string;
  username: string;
}): Promise<any> {
  const authHeader = await getAuthHeader(username);

  const resp = await fetch(`https://api.github.com/repos/${org}/${repo}/pulls/${prNumber}/merge`, {
    method: 'PUT',
    headers: {
      Authorization: authHeader,
    },
  });

  if (!resp.ok) {
    const {message} = await resp.json();
    throw new Error(message);
  }

  return resp.json();
}

async function getAuthHeader(username: string): Promise<string> {
  const optionsStorage = new OptionsSync<Options>();
  const {ghToken} = await optionsStorage.getAll();

  if (!ghToken) {
    alert('Please set Personal token first!');

    chrome.runtime.sendMessage({
      action: 'open-urls',
      params: {
        urls: [`chrome://extensions/?options=${chrome.runtime.id}`],
      },
    } as OpenURLsAction);
  }

  return `Basic ${btoa(`${username}:${ghToken}`)}`;
}
