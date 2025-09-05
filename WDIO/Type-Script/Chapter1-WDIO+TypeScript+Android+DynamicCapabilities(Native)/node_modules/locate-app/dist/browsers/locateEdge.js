"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateEdge = void 0;
const locateApp_1 = require("../locateApp");
function locateEdge() {
    return (0, locateApp_1.locateApp)({
        appName: 'Edge',
        windowsSuffix: '\\Microsoft\\Edge\\Application\\msedge.exe',
        linuxWhich: 'microsoft-edge',
        // TODO: Is there an macOS and Linux version of Edge?
    });
}
exports.locateEdge = locateEdge;
//# sourceMappingURL=locateEdge.js.map