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
const locateVscode_1 = require("./locateVscode");
describe('locating the Visual Studio Code IDE', () => {
    it('should locate Visual Studio Code IDE', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, locateVscode_1.locateVscode)()).resolves.toMatch(/code/i);
        expect.assertions(1);
    }));
});
//# sourceMappingURL=locateVscode.test.js.map