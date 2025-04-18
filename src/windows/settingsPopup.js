const { BrowserWindow } = require('electron');
const path = require('path');

let settingsWindow = null;

const showSettingsPopup = () => {
  if (settingsWindow) {
    if (settingsWindow.isMinimized()) {
      settingsWindow.restore();
    }
    settingsWindow.show();
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    alwaysOnTop: true,
    frame: true,
    center: true,
    icon: path.join(__dirname, '../assets/app-icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  settingsWindow.setMenu(null);

  settingsWindow.loadFile(path.join(__dirname, '../renderer/settings.html'));

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });

  settingsWindow.on('close', (event) => {
    event.preventDefault();
    settingsWindow.hide();
    settingsWindow = null;
  });
};

module.exports = { showSettingsPopup };