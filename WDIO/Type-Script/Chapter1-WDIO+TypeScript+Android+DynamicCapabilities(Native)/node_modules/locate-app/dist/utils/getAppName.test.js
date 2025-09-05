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
const locateBrowser_1 = require("../browsers/locateBrowser");
const getAppName_1 = require("./getAppName");
describe('getting browser name', () => {
    it('should get name of Chrome', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, getAppName_1.getAppName)(yield (0, locateBrowser_1.locateBrowser)('chrome'))).resolves.toBe('Chrome');
        expect.assertions(1);
    }));
    it('should get name of Firefox', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, getAppName_1.getAppName)(yield (0, locateBrowser_1.locateBrowser)('firefox'))).resolves.toBe('Firefox');
        expect.assertions(1);
    }));
    it('should get name of Safari', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'darwin') {
            yield expect((0, getAppName_1.getAppName)(yield (0, locateBrowser_1.locateBrowser)('safari'))).resolves.toBe('Safari');
            expect.assertions(1);
        }
    }));
    it('should get name of Edge', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'win32') {
            yield expect((0, getAppName_1.getAppName)(yield (0, locateBrowser_1.locateBrowser)('edge'))).resolves.toBe('Edge');
            yield expect((0, getAppName_1.getAppName)(yield (0, locateBrowser_1.locateBrowser)('msedge'))).resolves.toBe('Edge');
            expect.assertions(2);
        }
    }));
    it('should get name of Internet Explorer', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'win32') {
            yield expect((0, getAppName_1.getAppName)(yield (0, locateBrowser_1.locateBrowser)('ie'))).resolves.toBe('Internet Explorer');
            yield expect((0, getAppName_1.getAppName)(yield (0, locateBrowser_1.locateBrowser)('msie'))).resolves.toBe('Internet Explorer');
            expect.assertions(2);
        }
    }));
});
//# sourceMappingURL=getAppName.test.js.map