import domLoaded from 'dom-loaded';
import React from 'dom-chef';

export async function enableFilteringPRsFromBots(): Promise<void> {
  await domLoaded;

  document.querySelector('.filter-list.js-notification-sidebar-filters').prepend(
    <li>
      <a class="filter-item">🤖 PRs from Bots</a>
    </li>
  );
}
