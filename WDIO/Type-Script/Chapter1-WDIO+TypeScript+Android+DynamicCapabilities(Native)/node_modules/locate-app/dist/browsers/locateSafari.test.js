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
const locateSafari_1 = require("./locateSafari");
describe('locating the Safari browser', () => {
    it('should locate Safari browser', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'darwin') {
            yield expect((0, locateSafari_1.locateSafari)()).resolves.toMatch(/safari/i);
        }
        else {
            yield expect((0, locateSafari_1.locateSafari)()).rejects.toThrow();
        }
        expect.assertions(1);
    }));
});
//# sourceMappingURL=locateSafari.test.js.map