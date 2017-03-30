 //handle setupevents as quickly as possible
 const setupEvents = require('./installers/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }

const fs = require('fs')
const os = require('os')
const path = require('path')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const shell = electron.shell

// retransmit it to workerWindow
ipcMain.on("printPDF", (event, content) => {
    workerWindow.webContents.send("printPDF", content);
});
// when worker window is ready
ipcMain.on("readyToPrintPDF", (event) => {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf');
    // Use default printing options
    workerWindow.webContents.print({
      silent : true,
      printBackground  : true,
      'page-break-before': true,
    }, function (error, data) {
        if (error) throw error
        fs.writeFile(pdfPath, data, function (error) {
            if (error) {
                throw error
            }
            shell.openItem(pdfPath)
            event.sender.send('wrote-pdf', pdfPath)
        })
    })
});

// Module to control application life.
const app = electron.app
// Module to create native browser window.

//const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 2000, height: 1600})

  // // and load the index.html of the app.
  // mainWindow.loadURL(`file://${__dirname}/index.html`)

  // // Open the DevTools.
  mainWindow.webContents.openDevTools()

   mainWindow.loadURL('file://' + __dirname + '/index.html');
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  workerWindow = new BrowserWindow({ show: false });
   workerWindow.loadURL("file://" + __dirname + "/worker.html");
   // workerWindow.hide();
  //workerWindow.webContents.openDevTools();
   workerWindow.on("closed", () => {
       workerWindow = undefined;
   });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
