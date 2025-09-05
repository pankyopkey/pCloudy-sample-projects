"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateApp = void 0;
const locateAppOnLinux_1 = require("./platforms/locateAppOnLinux");
const locateAppOnMacOs_1 = require("./platforms/locateAppOnMacOs");
const locateAppOnWindows_1 = require("./platforms/locateAppOnWindows");
function locateApp({ appName, linuxWhich, windowsSuffix, macOsName, }) {
    if (process.platform === 'win32') {
        if (windowsSuffix) {
            return (0, locateAppOnWindows_1.locateAppOnWindows)({ appName, windowsSuffix });
        }
        else {
            throw new Error(`${appName} is not available on Windows.`);
        }
    }
    else if (process.platform === 'darwin') {
        if (macOsName) {
            return (0, locateAppOnMacOs_1.locateAppOnMacOs)({ appName, macOsName });
        }
        else {
            throw new Error(`${appName} is not available on macOS.`);
        }
    }
    else {
        if (linuxWhich) {
            return (0, locateAppOnLinux_1.locateAppOnLinux)({ appName, linuxWhich });
        }
        else {
            throw new Error(`${appName} is not available on Linux.`);
        }
    }
}
exports.locateApp = locateApp;
//# sourceMappingURL=locateApp.js.map