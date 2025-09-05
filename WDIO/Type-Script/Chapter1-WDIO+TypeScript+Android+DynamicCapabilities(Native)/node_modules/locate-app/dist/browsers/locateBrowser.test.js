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
const locateBrowser_1 = require("./locateBrowser");
describe('locating the browser', () => {
    it('should locate Chrome', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, locateBrowser_1.locateBrowser)('chrome')).resolves.toMatch(/chrome/i);
        expect.assertions(1);
    }));
    it('should locate Firefox', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, locateBrowser_1.locateBrowser)('firefox')).resolves.toMatch(/firefox/i);
        expect.assertions(1);
    }));
    it('should locate Safari', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'darwin') {
            yield expect((0, locateBrowser_1.locateBrowser)('safari')).resolves.toMatch(/safari/i);
        }
        else {
            yield expect((0, locateBrowser_1.locateBrowser)('safari')).rejects.toThrow();
        }
        expect.assertions(1);
    }));
    it('should locate Edge', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'win32') {
            yield expect((0, locateBrowser_1.locateBrowser)('edge')).resolves.toMatch(/msedge/i);
            yield expect((0, locateBrowser_1.locateBrowser)('msedge')).resolves.toMatch(/msedge/i);
        }
        else {
            yield expect((0, locateBrowser_1.locateBrowser)('edge')).rejects.toThrow();
            yield expect((0, locateBrowser_1.locateBrowser)('msedge')).rejects.toThrow();
        }
        expect.assertions(2);
    }));
    it('should locate Internet Explorer', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'win32') {
            yield expect((0, locateBrowser_1.locateBrowser)('ie')).resolves.toMatch(/iexplore/i);
            yield expect((0, locateBrowser_1.locateBrowser)('msie')).resolves.toMatch(/iexplore/i);
        }
        else {
            yield expect((0, locateBrowser_1.locateBrowser)('edge')).rejects.toThrow();
            yield expect((0, locateBrowser_1.locateBrowser)('msedge')).rejects.toThrow();
        }
        expect.assertions(2);
    }));
    it('should fail when passing invalid entries', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, locateBrowser_1.locateBrowser)('chromex')).rejects.toThrow();
        yield expect((0, locateBrowser_1.locateBrowser)('dfsagrg/efsdfsdf')).rejects.toThrow();
        yield expect((0, locateBrowser_1.locateBrowser)('https://jestjs.io/docs/expect')).rejects.toThrow();
        expect.assertions(3);
    }));
});
//# sourceMappingURL=locateBrowser.test.js.map