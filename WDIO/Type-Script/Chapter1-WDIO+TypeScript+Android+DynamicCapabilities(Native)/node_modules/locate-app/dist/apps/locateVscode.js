"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateVscode = void 0;
const locateApp_1 = require("../locateApp");
function locateVscode() {
    return (0, locateApp_1.locateApp)({
        appName: 'Code',
        linuxWhich: 'code',
        windowsSuffix: '\\Microsoft VS Code\\Code.exe',
        macOsName: 'Code',
    });
}
exports.locateVscode = locateVscode;
//# sourceMappingURL=locateVscode.js.map