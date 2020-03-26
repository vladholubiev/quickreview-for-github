import {enableViewingFilesOnVPress} from './features/pull-requests/press-v-to-view';
import {enableApproveMergeShortcuts} from './features/pull-requests/press-a-approve-m-merge';

async function init() {
  enableViewingFilesOnVPress();
  enableApproveMergeShortcuts();
}

init();
