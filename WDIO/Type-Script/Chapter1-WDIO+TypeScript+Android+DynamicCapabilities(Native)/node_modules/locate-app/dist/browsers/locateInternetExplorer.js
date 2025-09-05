"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateInternetExplorer = void 0;
const locateApp_1 = require("../locateApp");
function locateInternetExplorer() {
    return (0, locateApp_1.locateApp)({
        appName: 'ie',
        windowsSuffix: '\\Internet Explorer\\iexplore.exe',
    });
}
exports.locateInternetExplorer = locateInternetExplorer;
//# sourceMappingURL=locateInternetExplorer.js.map