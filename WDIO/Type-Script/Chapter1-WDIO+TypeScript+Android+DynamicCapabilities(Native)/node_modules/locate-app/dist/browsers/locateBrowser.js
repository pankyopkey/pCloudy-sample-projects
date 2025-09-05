"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateBrowser = void 0;
const isExecutable_1 = require("../utils/isExecutable");
const locateChrome_1 = require("./locateChrome");
const locateDefaultSystemBrowser_1 = require("./locateDefaultSystemBrowser");
const locateEdge_1 = require("./locateEdge");
const locateFirefox_1 = require("./locateFirefox");
const locateInternetExplorer_1 = require("./locateInternetExplorer");
const locateSafari_1 = require("./locateSafari");
/**
 *
 * @param browser It can be "default", "chrome", "firefox", "safari", "ie", "msie", "edge" or "msedge" or executable path to the browser
 * @returns executable path to browser
 */
function locateBrowser(browser) {
    return __awaiter(this, void 0, void 0, function* () {
        if (/^[a-zA-Z]+$/.test(browser)) {
            browser = browser.toLowerCase();
            if (browser === 'default') {
                browser = yield (0, locateDefaultSystemBrowser_1.locateDefaultSystemBrowser)();
            } /* not else */
            if (browser === 'chrome') {
                return (0, locateChrome_1.locateChrome)();
            }
            else if (browser === 'firefox') {
                return (0, locateFirefox_1.locateFirefox)();
            }
            else if (browser === 'safari') {
                return (0, locateSafari_1.locateSafari)();
            }
            else if (browser === 'ie' || browser === 'msie') {
                return (0, locateInternetExplorer_1.locateInternetExplorer)();
            }
            else if (browser === 'edge' || browser === 'msedge') {
                return (0, locateEdge_1.locateEdge)();
            }
            else {
                throw new Error(`Unknown browser "${browser}". You can pass full executable path instead. `);
            }
        }
        else if (/.*[\\/].*/.test(browser)) {
            if (yield (0, isExecutable_1.isExecutable)(browser)) {
                return browser;
            }
            else {
                throw new Error(`Can not access browser executable path "${browser}".`);
            }
        }
        else {
            throw new Error(`"${browser}" is not browser name or executable path to the browser.`);
        }
    });
}
exports.locateBrowser = locateBrowser;
//# sourceMappingURL=locateBrowser.js.map