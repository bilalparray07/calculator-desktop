const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const path = require("path");
const log = require("electron-log");

// initializing log so that our update information will be availbale for us
log.initialize();

// using a specifive location for out log file
log.transports.file.resolvePathFn = () => path.join("D:", "logs", "/main.log"); ///storing to D drive and in logs folder

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 370,
    height: 580,

    // titleBarStyle: "hidden", ///to remove the top bar
    minWidth: 370,
    icon: "src/assets/icons/ico.ico",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // removing default menu----
  mainWindow.removeMenu(); //commit this line if you want to use menu
};

/**
 * // This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
 */
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * setFeedUrl for autoupdate,,,, this will work for local server or actual static server where we will put our files so that they can be accesible
 */
autoUpdater.setFeedURL({
  provider: "generic",
  url: "http://192.168.29.71:3031/", // Replace with your actual server address
});

// checking updates every hour after app starts
setInterval(() => {
  autoUpdater.checkForUpdates();
}, 3600000);

// Handle update events for different events ---events are used as parameters eg checking-for-update
autoUpdater.on("checking-for-update", () => {
  log.info("Checking for update...");
});
autoUpdater.on("update-available", () => {
  log.info("Update available.");
});
autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "A new version has been downloaded. Restart the application to apply the updates.",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});
autoUpdater.on("update-not-available", () => {
  log.info("Update not available.");
});

autoUpdater.on("error", (error) => {
  log.error("AutoUpdater error ghangta:", error);
});
