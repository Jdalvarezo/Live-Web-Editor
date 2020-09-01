// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require('electron')

function createWindow () {
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('view/editor/index.html')
  // remove application menu
  mainWindow.setMenu(null)
  // maximize the application window
  mainWindow.maximize();
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Displays the window once all components have loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Open links in the default browser
  // NOTE: Require use target="_blank" on anchor tags
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })

  // Control the closing of the application
  mainWindow.on('close', (evt) => {
    
    evt.preventDefault()

    const options = {
      type: 'question',
      buttons: ['&Yes, please', '&No, thanks', '&Cancel'],
      defaultId: 1,
      title: 'Live Web Editor',
      message: 'Do you want to close the application?',
      detail: 'You may lose information that you have not previously saved.',
      cancelId: 2,
      noLink: true,
      normalizeAccessKeys: true
    }

    dialog.showMessageBox(mainWindow, options).then(result => {
      if (result.response === 0) { mainWindow.destroy() }
    })

  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
