const { globalShortcut } = require('electron');
const { loadSettings } = require('./settings');
const actions = require('./actions');

let deactivateAppCallback = null;

const registerActionShortcuts = (deactivateApp) => {
  deactivateAppCallback = deactivateApp;

  const settings = loadSettings();
  const shortcuts = settings.shortcuts;

  Object.entries(shortcuts).forEach(([key, action]) => {
    const success = globalShortcut.register(key, () => {
      if (typeof actions[action] === 'function') {
        actions[action]();
        deactivateAppCallback();
      } else {
        console.error(`Action "${action}" is not a valid function.`);
      }
    });

    if (!success) {
      console.error(`Failed to register shortcut: ${key}`);
    }
  });
};

const unregisterActionShortcuts = () => {
  const settings = loadSettings();
  const shortcuts = settings.shortcuts;

  Object.keys(shortcuts).forEach((key) => {
    globalShortcut.unregister(key);
  });
};

module.exports = {
  registerActionShortcuts,
  unregisterActionShortcuts,
};