import OptionsSync from 'webext-options-sync';

function init() {
  const optionsStorage = new OptionsSync();
  optionsStorage.syncForm(document.querySelector('form'));
}

init();
