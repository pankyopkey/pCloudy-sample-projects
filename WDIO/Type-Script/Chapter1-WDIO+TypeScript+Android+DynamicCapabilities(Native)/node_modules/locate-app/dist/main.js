"use strict";
// GENERATED WITH generate-main-exports
// Warning: Do not edit by hand, all changes will be lost on next execution!
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateDefaultSystemBrowser = exports.locateInternetExplorer = exports.locateAppOnWindows = exports.locateAppOnLinux = exports.locateAppOnMacOs = exports.locateBrowser = exports.locateFirefox = exports.locateVscode = exports.locateChrome = exports.locateSafari = exports.isExecutable = exports.locateEdge = exports.getAppName = exports.locateApp = void 0;
const locateVscode_1 = require("./apps/locateVscode");
Object.defineProperty(exports, "locateVscode", { enumerable: true, get: function () { return locateVscode_1.locateVscode; } });
const locateBrowser_1 = require("./browsers/locateBrowser");
Object.defineProperty(exports, "locateBrowser", { enumerable: true, get: function () { return locateBrowser_1.locateBrowser; } });
const locateChrome_1 = require("./browsers/locateChrome");
Object.defineProperty(exports, "locateChrome", { enumerable: true, get: function () { return locateChrome_1.locateChrome; } });
const locateDefaultSystemBrowser_1 = require("./browsers/locateDefaultSystemBrowser");
Object.defineProperty(exports, "locateDefaultSystemBrowser", { enumerable: true, get: function () { return locateDefaultSystemBrowser_1.locateDefaultSystemBrowser; } });
const locateEdge_1 = require("./browsers/locateEdge");
Object.defineProperty(exports, "locateEdge", { enumerable: true, get: function () { return locateEdge_1.locateEdge; } });
const locateFirefox_1 = require("./browsers/locateFirefox");
Object.defineProperty(exports, "locateFirefox", { enumerable: true, get: function () { return locateFirefox_1.locateFirefox; } });
const locateInternetExplorer_1 = require("./browsers/locateInternetExplorer");
Object.defineProperty(exports, "locateInternetExplorer", { enumerable: true, get: function () { return locateInternetExplorer_1.locateInternetExplorer; } });
const locateSafari_1 = require("./browsers/locateSafari");
Object.defineProperty(exports, "locateSafari", { enumerable: true, get: function () { return locateSafari_1.locateSafari; } });
const locateApp_1 = require("./locateApp");
Object.defineProperty(exports, "locateApp", { enumerable: true, get: function () { return locateApp_1.locateApp; } });
const locateAppOnLinux_1 = require("./platforms/locateAppOnLinux");
Object.defineProperty(exports, "locateAppOnLinux", { enumerable: true, get: function () { return locateAppOnLinux_1.locateAppOnLinux; } });
const locateAppOnMacOs_1 = require("./platforms/locateAppOnMacOs");
Object.defineProperty(exports, "locateAppOnMacOs", { enumerable: true, get: function () { return locateAppOnMacOs_1.locateAppOnMacOs; } });
const locateAppOnWindows_1 = require("./platforms/locateAppOnWindows");
Object.defineProperty(exports, "locateAppOnWindows", { enumerable: true, get: function () { return locateAppOnWindows_1.locateAppOnWindows; } });
const getAppName_1 = require("./utils/getAppName");
Object.defineProperty(exports, "getAppName", { enumerable: true, get: function () { return getAppName_1.getAppName; } });
const isExecutable_1 = require("./utils/isExecutable");
Object.defineProperty(exports, "isExecutable", { enumerable: true, get: function () { return isExecutable_1.isExecutable; } });
//# sourceMappingURL=main.js.map