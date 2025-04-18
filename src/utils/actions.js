const { exec } = require('child_process');
const path = require('path');
const { showHelpPopup } = require('../windows/helpPopup');

const chromePath = path.join(process.env['ProgramFiles'], 'Google', 'Chrome', 'Application', 'chrome.exe');
const chromePathX86 = path.join(process.env['ProgramFiles(x86)'], 'Google', 'Chrome', 'Application', 'chrome.exe');
const vscodePath = `"C:\\Users\\H2\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"`;
const zaloPath = path.join(process.env['LOCALAPPDATA'], 'Programs', 'Zalo', 'Zalo.exe');
const sourceTreePath = `"C:\\Users\\H2\\AppData\\Local\\SourceTree\\SourceTree.exe"`;

const lockScreen = () => {
  exec('rundll32.exe user32.dll,LockWorkStation');
};

const shutDown = () => {
  exec('shutdown /s /t 0');
};

const openChrome = () => {
  exec('tasklist | findstr /i "chrome.exe"', (error, stdout) => {
    if (stdout) {
      exec(`powershell -command "(New-Object -ComObject WScript.Shell).AppActivate('chrome')"`); 
    } else {
      exec(`"${chromePath}" --new-window`, (err) => {
        if (err) {
          exec(`"${chromePathX86}" --new-window`);
        }
      });
    }
  });
};

const openVSCode = () => {
  exec('tasklist | findstr /i "Code.exe"', (error, stdout) => {
    if (stdout) {
      exec(`powershell -command "(New-Object -ComObject WScript.Shell).AppActivate('Visual Studio Code')"`); 
    } else {
      exec(`start "" ${vscodePath}`);
    }
  });
};

const openStickyNotes = () => {
  exec('start shell:AppsFolder\\Microsoft.MicrosoftStickyNotes_8wekyb3d8bbwe!App');
};

const focusMessenger = () => {
  exec(`powershell -command "(New-Object -ComObject WScript.Shell).AppActivate('Messenger')"`); 
};

const focusZalo = () => {
  exec(`start "" "${zaloPath}"`);
};

const closeCurrentTab = () => {
  exec(`powershell -command "(New-Object -ComObject WScript.Shell).SendKeys('%{F4}')"`); 
};

const openSourceTree = () => {
  exec('tasklist | findstr /i "SourceTree.exe"', (error, stdout) => {
    if (stdout) {
      exec(`powershell -command "(New-Object -ComObject WScript.Shell).AppActivate('SourceTree')"`); 
    } else {
      exec(`start "" ${sourceTreePath}`);
    }
  });
};

module.exports = {
  lockScreen,
  shutDown,
  openChrome,
  openVSCode,
  openStickyNotes,
  focusMessenger,
  focusZalo,
  closeCurrentTab,
  openSourceTree,
  showHelpPopup,
};