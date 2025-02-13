import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    alert(`file://${path.join(__dirname, '/dist/index.html')}`);
    // Load built Vite app from dist/
    mainWindow.loadURL(`file://${path.join(__dirname, '/dist/index.html')}`);

    // Debugging
    mainWindow.webContents.openDevTools(); // See if there are errors

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.whenReady().then(createMainWindow);

// Ensure app stays open on macOS
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
