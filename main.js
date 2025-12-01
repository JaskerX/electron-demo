const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const TimerHandler = require("./timerHandler");
const { Menu, dialog } = require('electron');

let window;

const createWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: "Menü",
      submenu: [
        {
          click: () => new BrowserWindow({
            width: 600,
            height: 400
          }),
          label: "Fenster"
        },
        {
          label: "Dialog-Menü",
          submenu: [
            {
              click: () => dialog.showMessageBox("Demo"),
              label: "Dialog"
            }
          ]
        }
      ]
    }
  ])
  window.setMenu(menu)

  window.loadFile('index.html')
}

app.whenReady().then(() => {
  setupIpcMain();

  createWindow();

  // macOS exception: app running in background even without windows open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// close not macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const setupIpcMain = () => {
  const timerHandler = new TimerHandler();
  ipcMain.handle("reset-timer", (_event, seconds) => timerHandler.reset(seconds));
  ipcMain.handle("start-timer", () => timerHandler.start(window));
  ipcMain.handle("pause-timer", () => timerHandler.pause());
}