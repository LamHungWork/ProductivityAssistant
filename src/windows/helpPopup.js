const { BrowserWindow } = require('electron');
const path = require('path');

let helpWindow = null;

const showHelpPopup = () => {
  if (helpWindow) {
    helpWindow.focus();
    return;
  }

  helpWindow = new BrowserWindow({
    width: 600,
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

  helpWindow.setMenu(null);

  helpWindow.loadFile(path.join(__dirname, '../renderer/help.html'));

  helpWindow.on('closed', () => {
    helpWindow = null;
  });
  helpWindow.on('close', (event) => {
    event.preventDefault();
    helpWindow.hide();
    helpWindow = null;
  });
};

module.exports = { showHelpPopup };