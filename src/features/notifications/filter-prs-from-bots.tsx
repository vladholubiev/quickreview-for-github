import domLoaded from 'dom-loaded';
import React from 'dom-chef';
import select from 'select-dom';

export async function enableFilteringPRsFromBots(): Promise<void> {
  await domLoaded;

  addButton();

  document.addEventListener('pjax:end', () => {
    addButton();
  });
}

function addButton(): void {
  document.querySelector('.filter-list.js-notification-sidebar-filters')?.prepend(
    <li onclick={filterPRsFromBots}>
      <a class="filter-item" id="ghp-prs-from-bots">
        <span class="count text-normal">{getPRsFromBotsCount()}</span>
        🤖 PRs from Bots Only
      </a>
    </li>
  );
}

function getPRsFromBotsCount(): number {
  return select.all<HTMLAnchorElement>('a.avatar[href*=bot]').length;
}

function filterPRsFromBots(): void {
  select<HTMLAnchorElement>('#ghp-prs-from-bots').classList.add('selected');

  select
    .all<HTMLAnchorElement>('a.avatar:not([href*=bot])')
    .map(el => el.closest('.notifications-list-item'))
    .map(el => el.remove());
}
