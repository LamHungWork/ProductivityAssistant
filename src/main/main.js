const { app, globalShortcut, Tray } = require('electron');
const path = require('path');
const { registerActionShortcuts, unregisterActionShortcuts } = require('../utils/shortcuts');
const createTrayMenu = require('./trayMenu');
const { registerIpcHandlers, setIsActive } = require('./ipcHandlers');

let tray = null;
let isActive = false;

const updateTrayTooltip = () => {
  if (tray) {
    tray.setToolTip(`Productivity Assistant (${isActive ? 'Active' : 'Inactive'})`);
  }
};

const toggleActivation = (active) => {
  isActive = active;
  setIsActive(active);
  updateTrayTooltip();

  if (active) {
    registerActionShortcuts(() => toggleActivation(false));
  } else {
    unregisterActionShortcuts();
  }
};

const createTray = () => {
  tray = new Tray(path.join(__dirname, '../assets/app-icon.ico'));
  updateTrayTooltip();

  const contextMenu = createTrayMenu();
  tray.setContextMenu(contextMenu);
};

const registerGlobalShortcuts = () => {
  globalShortcut.register('Control+Space', () => {
    toggleActivation(!isActive);
  });
};

app.on('ready', () => {
  createTray();
  registerGlobalShortcuts();
  registerIpcHandlers(toggleActivation);
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});