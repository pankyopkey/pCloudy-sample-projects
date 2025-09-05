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
const locateInternetExplorer_1 = require("./locateInternetExplorer");
describe('locating the Internet Explorer browser', () => {
    it('should locate Internet Explorer browser', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'win32') {
            yield expect((0, locateInternetExplorer_1.locateInternetExplorer)()).resolves.toMatch(/iexplore/i);
        }
        else {
            yield expect((0, locateInternetExplorer_1.locateInternetExplorer)()).rejects.toThrow();
        }
        expect.assertions(1);
    }));
});
//# sourceMappingURL=locateInternetExplorer.test.js.map