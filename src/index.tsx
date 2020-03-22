import {enableFilteringPRsFromBots} from './features/notifications/filter-prs-from-bots';
import {enableViewingFilesOnVPress} from './features/pull-requests/press-v-to-view';

async function init() {
  enableFilteringPRsFromBots();
  enableViewingFilesOnVPress();
}

init();
