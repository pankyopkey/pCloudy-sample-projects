"use strict";
// tslint:disable-next-line: no-reference
/// <reference path="./userhome.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateAppOnMacOs = void 0;
const child_process_1 = require("child_process");
const userhome_1 = __importDefault(require("userhome"));
const util_1 = require("util");
const isExecutable_1 = require("../utils/isExecutable");
const exec = (0, util_1.promisify)(child_process_1.exec);
function locateAppOnMacOs({ appName, macOsName, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const toExec = `/Contents/MacOS/${macOsName}`;
        const regPath = `/Applications/${macOsName}.app` + toExec;
        const altPath = (0, userhome_1.default)(regPath.slice(1));
        if (yield (0, isExecutable_1.isExecutable)(regPath)) {
            return regPath;
        }
        else if (yield (0, isExecutable_1.isExecutable)(altPath)) {
            return altPath;
        }
        const { stderr, stdout } = yield exec(`mdfind \'kMDItemDisplayName == "${macOsName}" && kMDItemKind == Application\'`);
        if (!stderr && stdout) {
            return stdout.trim() + toExec;
        }
        throw new Error(`Can not locate app ${appName} on macOS.\n ${stderr}`);
    });
}
exports.locateAppOnMacOs = locateAppOnMacOs;
//# sourceMappingURL=locateAppOnMacOs.js.map