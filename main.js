/**
 * Valery Mystic Hair — desktop shell (Electron).
 * One window, two panels:
 *   - left  : the dashboard (vmhcrm.app)
 *   - right : real WhatsApp Web (web.whatsapp.com) in a persistent session
 *
 * WhatsApp Web runs in a <webview> with partition "persist:whatsapp" so you
 * scan the QR only once; the session survives restarts (like WhatsApp Desktop).
 */

const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');

// The dashboard URL. Change here if your domain changes.
const DASHBOARD_URL = process.env.VMH_URL || 'https://vmhcrm.app';

function createWindow() {
  const win = new BrowserWindow({
    width: 1480,
    height: 940,
    minWidth: 1024,
    minHeight: 680,
    title: 'Valery Mystic Hair',
    backgroundColor: '#dedcd4',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,        // enable <webview>
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile('shell.html', { query: { dash: DASHBOARD_URL } });

  // open target=_blank / external links in the system browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Give the WhatsApp webview a modern Chrome user-agent (web.whatsapp.com is picky).
app.on('ready', () => {
  const CHROME_UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
  try {
    session.fromPartition('persist:whatsapp').setUserAgent(CHROME_UA);
  } catch (_) {}
  createWindow();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
