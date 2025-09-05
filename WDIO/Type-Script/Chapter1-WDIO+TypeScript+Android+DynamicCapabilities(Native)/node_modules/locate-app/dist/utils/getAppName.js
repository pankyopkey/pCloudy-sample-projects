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
exports.getAppName = void 0;
const utils_1 = require("@promptbook/utils"); // <- TODO: Use partial imports
/**
 *
 * @param appPath path to the app executable
 * @returns human-readable app name
 */
function getAppName(executablePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Get app name from real exif information not the filename
        const match = executablePath.match(/(?<browserName>[^\\\/\.]*)(?:(?:[^\\\/])*)$/i);
        if (match) {
            const appName = match.groups.browserName;
            if (appName === 'iexplore') {
                return 'Internet Explorer';
            }
            else if (appName === 'msedge') {
                return 'Edge';
            }
            else if (appName === 'google-chrome') {
                return 'Chrome';
            }
            else {
                return (0, utils_1.capitalize)(appName);
            }
        }
        throw new Error(`Can not get name of "${executablePath}".`);
    });
}
exports.getAppName = getAppName;
//# sourceMappingURL=getAppName.js.map