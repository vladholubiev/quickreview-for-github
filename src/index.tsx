import {enableFilteringPRsFromBots} from './features/notifications/filter-prs-from-bots';
import {enableViewingFilesOnVPress} from './features/pull-requests/press-v-to-view';
import {enableApprovingPROnAPress} from './features/pull-requests/press-a-to-approve';

async function init() {
  enableFilteringPRsFromBots();
  enableViewingFilesOnVPress();
  enableApprovingPROnAPress();
}

init();
