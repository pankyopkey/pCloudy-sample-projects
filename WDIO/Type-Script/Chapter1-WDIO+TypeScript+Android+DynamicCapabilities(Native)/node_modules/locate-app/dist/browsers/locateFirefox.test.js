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
const locateFirefox_1 = require("./locateFirefox");
describe('locating the Firefox browser', () => {
    it('should locate Firefox browser', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, locateFirefox_1.locateFirefox)()).resolves.toMatch(/firefox/i);
        expect.assertions(1);
    }));
});
//# sourceMappingURL=locateFirefox.test.js.map