import {enableViewingFilesOnVPress} from './features/pull-requests/press-v-to-view';
import {enableApproveMergeShortcuts} from './features/pull-requests/press-a-approve-m-merge';

async function init() {
  const {host} = window.location;

  if (host.includes('github.com')) {
    enableViewingFilesOnVPress();
    enableApproveMergeShortcuts();
  }
}

init();
