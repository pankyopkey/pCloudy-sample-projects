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
exports.locateAppOnWindows = void 0;
const path_1 = require("path");
const isExecutable_1 = require("../utils/isExecutable");
function locateAppOnWindows({ appName, windowsSuffix, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const prefixes = [
            process.env.LOCALAPPDATA,
            (0, path_1.join)(process.env.LOCALAPPDATA || '', 'Programs'),
            process.env.PROGRAMFILES,
            process.env['PROGRAMFILES(X86)'],
        ];
        for (const prefix of prefixes) {
            const path = prefix + windowsSuffix;
            if (yield (0, isExecutable_1.isExecutable)(path)) {
                return path;
            }
        }
        throw new Error(`Can not locate app ${appName} on Windows.`);
    });
}
exports.locateAppOnWindows = locateAppOnWindows;
//# sourceMappingURL=locateAppOnWindows.js.map