"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateSafari = void 0;
const locateApp_1 = require("../locateApp");
function locateSafari() {
    return (0, locateApp_1.locateApp)({
        appName: 'Safari',
        windowsSuffix: '\\Safari\\Safari.exe',
        macOsName: 'Safari',
    });
}
exports.locateSafari = locateSafari;
//# sourceMappingURL=locateSafari.js.map