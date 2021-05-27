import OptionsSync from 'webext-options-sync';
import {Options} from '../types';
import {openNewTab} from './helpers/open-tab';

export async function approvePR({
  org,
  repo,
  prNumber,
  username
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
        Authorization: authHeader
      },
      body: JSON.stringify({
        event: 'APPROVE'
      })
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
  username
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
      Authorization: authHeader
    }
  });

  if (!resp.ok) {
    const {message} = await resp.json();
    throw new Error(message);
  }

  return resp.json();
}

async function getAuthHeader(username: string): Promise<string> {
  const ghToken = await getGitHubTokenFromOptions();

  if (!ghToken) {
    alert('Please set Personal token first!');

    openNewTab(`chrome://extensions/?options=${chrome.runtime.id}`);
  }

  return `Basic ${btoa(`${username}:${ghToken}`)}`;
}

async function getGitHubTokenFromOptions(): Promise<string> {
  const optionsStorage = new OptionsSync<Options>();
  const {ghToken} = await optionsStorage.getAll();

  return ghToken;
}

async function getCircleTokenFromOptions(): Promise<string> {
  const optionsStorage = new OptionsSync<Options>();
  const {circleToken} = await optionsStorage.getAll();

  return circleToken;
}
