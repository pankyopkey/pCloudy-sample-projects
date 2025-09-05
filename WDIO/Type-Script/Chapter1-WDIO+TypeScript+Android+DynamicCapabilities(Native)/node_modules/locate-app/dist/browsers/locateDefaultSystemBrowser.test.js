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
const locateDefaultSystemBrowser_1 = require("./locateDefaultSystemBrowser");
describe('locating default system browser', () => {
    it('should locate default system browser', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, locateDefaultSystemBrowser_1.locateDefaultSystemBrowser)()).resolves.toBeDefined();
        expect.assertions(1);
    }));
    it('should locate same default system browser when asking twice', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, locateDefaultSystemBrowser_1.locateDefaultSystemBrowser)()).toEqual(yield (0, locateDefaultSystemBrowser_1.locateDefaultSystemBrowser)());
        expect.assertions(1);
    }));
});
//# sourceMappingURL=locateDefaultSystemBrowser.test.js.map