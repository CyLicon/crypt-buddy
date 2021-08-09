const { Menu, app, BrowserWindow } = require("electron");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  const { userkeys } = require("./keystore");
  const path = require("path");
  if (!userkeys.get("private") && !userkeys.get("public")) {
    // open first-run.html if it is the first run of the app
    mainWindow.loadFile(path.join(__dirname, "pages/first-run.html"));
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const path = require("path");
  const isMac = process.platform === "darwin";
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Encrypt",
          click: () => {
            mainWindow.loadFile(path.join(__dirname, "pages/encrypt.html"));
          },
        },
        {
          label: "Decrypt",
          click: () => {
            mainWindow.loadFile(path.join(__dirname, "pages/decrypt.html"));
          },
        },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { type: "separator" },
        {
          label: "Keychain",
          click: () => {
            mainWindow.loadFile(path.join(__dirname, "pages/keychain.html"));
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  const { userkeys } = require("./keystore");
  if (!userkeys.get("private") && !userkeys.get("public")) {
    // open first-run.html if it is the first run of the app
    mainWindow.loadFile(path.join(__dirname, "pages/first-run.html"));
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }
});

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
