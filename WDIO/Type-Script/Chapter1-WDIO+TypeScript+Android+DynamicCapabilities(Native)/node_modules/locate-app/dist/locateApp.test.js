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
const locateApp_1 = require("./locateApp");
describe('locating the app', () => {
    it('should locate Chrome', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, locateApp_1.locateApp)({
            appName: 'Chrome',
            linuxWhich: 'google-chrome',
            windowsSuffix: '\\Google\\Chrome\\Application\\chrome.exe',
            macOsName: 'Google Chrome',
        })).resolves.toMatch(/chrome/i);
        expect.assertions(1);
    }));
});
//# sourceMappingURL=locateApp.test.js.map