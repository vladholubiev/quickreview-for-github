import {enableFilteringPRsFromBots} from './features/notifications/filter-prs-from-bots';
import {enableViewingFilesOnVPress} from './features/pull-requests/press-v-to-view';
import {enableApproveMergeShortcuts} from './features/pull-requests/press-a-approve-m-merge';

async function init() {
  enableFilteringPRsFromBots();
  enableViewingFilesOnVPress();
  enableApproveMergeShortcuts();
}

init();
