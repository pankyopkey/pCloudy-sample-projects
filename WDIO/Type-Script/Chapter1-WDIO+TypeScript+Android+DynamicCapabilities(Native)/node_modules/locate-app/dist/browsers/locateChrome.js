"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateChrome = void 0;
const locateApp_1 = require("../locateApp");
function locateChrome() {
    return (0, locateApp_1.locateApp)({
        appName: 'Chrome',
        linuxWhich: 'google-chrome',
        windowsSuffix: '\\Google\\Chrome\\Application\\chrome.exe',
        macOsName: 'Google Chrome',
    });
}
exports.locateChrome = locateChrome;
//# sourceMappingURL=locateChrome.js.map