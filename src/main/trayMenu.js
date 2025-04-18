const { Menu, app, BrowserWindow } = require('electron');
const { showHelpPopup } = require('../windows/helpPopup');
const { showSettingsPopup } = require('../windows/settingsPopup');

const createTrayMenu = () => {
  return Menu.buildFromTemplate([
    {
      label: 'Settings',
      click: () => {
        showSettingsPopup();
      },
    },
    {
      label: 'Help',
      click: () => {
        showHelpPopup();
      },
    },
    {
      label: 'Quit',
      click: () => {
        BrowserWindow.getAllWindows().forEach((window) => {
          window.destroy();
        });

        app.quit();
      },
    },
  ]);
};

module.exports = createTrayMenu;