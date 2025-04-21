const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const settingsFilePath = path.join(app.getPath('userData'), 'settings.json');

const defaultSettings = {
  shortcuts: {
    Esc: 'shutDown',
    C: 'openChrome',
    H: 'showHelpPopup',
    L: 'openSlack',
    M: 'focusMessenger',
    N: 'openStickyNotes',
    Q: 'closeCurrentTab',
    S: 'lockScreen',
    T: 'openSourceTree',
    V: 'openVSCode',
    Z: 'focusZalo',
  },
};

const loadSettings = () => {
  if (fs.existsSync(settingsFilePath)) {
    return JSON.parse(fs.readFileSync(settingsFilePath, 'utf-8'));
  }
  return defaultSettings;
};

const saveSettings = (settings) => {
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
};

const resetSettings = () => {
  saveSettings(defaultSettings);
  return defaultSettings;
};

module.exports = {
  loadSettings,
  saveSettings,
  resetSettings,
};