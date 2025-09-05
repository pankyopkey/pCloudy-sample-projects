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
const locateEdge_1 = require("./locateEdge");
describe('locating the Edge browser', () => {
    it('should locate Edge browser', () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.platform === 'win32') {
            yield expect((0, locateEdge_1.locateEdge)()).resolves.toMatch(/msedge/i);
        }
        else {
            yield expect((0, locateEdge_1.locateEdge)()).rejects.toThrow();
        }
        expect.assertions(1);
    }));
});
//# sourceMappingURL=locateEdge.test.js.map