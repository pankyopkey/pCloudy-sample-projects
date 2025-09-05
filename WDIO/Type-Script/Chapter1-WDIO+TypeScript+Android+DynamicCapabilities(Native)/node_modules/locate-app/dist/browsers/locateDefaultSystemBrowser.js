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
exports.locateDefaultSystemBrowser = void 0;
/**
 *
 * @param browser It can be "default", "chrome", "firefox", "safari", "ie", "msie", "edge" or "msedge" or executable path to the browser
 * @returns executable path to browser
 */
function locateDefaultSystemBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        return 'chrome';
        // TODO: Get default system browser DO not expect Chrome
        //       @see https://www.npmjs.com/package/x-default-browser
    });
}
exports.locateDefaultSystemBrowser = locateDefaultSystemBrowser;
//# sourceMappingURL=locateDefaultSystemBrowser.js.map