const { app, BrowserWindow } = require('electron')
try {
  require('electron-reloader')(module)
} catch (_) {}

const isDev = require('electron-is-dev')
const fs = require('fs')
const csv = require('csv-parser')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000' : null)
  win.webContents.openDevTools()

  //存储数据 []

  let bills = []

  const storeData = (data) => {
    try {
      bills.push(data)
    } catch (err) {
      //error handler
      console.log(err)
    }
  }

  const sendData = (type, arr) => {
    win.webContents.send(type, arr)
  }

  win.webContents.on('did-finish-load', () => {
    bills = []
    fs.createReadStream('data/bill.csv')
      .pipe(csv())
      .on('data', storeData)
      .on('end', () => sendData('ping', bills))
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
