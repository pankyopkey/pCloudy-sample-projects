"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateFirefox = void 0;
const locateApp_1 = require("../locateApp");
function locateFirefox() {
    return (0, locateApp_1.locateApp)({
        appName: 'Firefox',
        linuxWhich: 'firefox',
        windowsSuffix: '\\Mozilla Firefox\\firefox.exe',
        macOsName: 'Firefox',
    });
}
exports.locateFirefox = locateFirefox;
//# sourceMappingURL=locateFirefox.js.map