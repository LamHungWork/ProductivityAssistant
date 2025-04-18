const { ipcMain } = require('electron');
const { loadSettings, saveSettings, resetSettings } = require('../utils/settings');
const { registerActionShortcuts, unregisterActionShortcuts } = require('../utils/shortcuts');

let isActive = false;

const setIsActive = (active) => {
  isActive = active;
};

const registerIpcHandlers = (toggleActivation) => {
  ipcMain.handle('get-settings', () => {
    return loadSettings().shortcuts;
  });

  ipcMain.on('save-settings', (event, newShortcuts) => {
    const newSettings = { shortcuts: newShortcuts };
    saveSettings(newSettings);

    unregisterActionShortcuts();
    if (isActive) {
      registerActionShortcuts(() => toggleActivation(false));
    }
  });

  ipcMain.on('reset-settings', () => {
    resetSettings();

    unregisterActionShortcuts();
    if (isActive) {
      registerActionShortcuts(() => toggleActivation(false));
    }
  });
};

module.exports = {
  registerIpcHandlers,
  setIsActive,
};