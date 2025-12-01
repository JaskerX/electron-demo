const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  resetTimer: (seconds) => ipcRenderer.invoke("reset-timer", seconds),
  startTimer: () => ipcRenderer.invoke("start-timer"),
  pauseTimer: () => ipcRenderer.invoke("pause-timer"),
  onUpdateTimer: (callback) => ipcRenderer.on("update-timer", (_event, seconds) => callback(seconds))
})