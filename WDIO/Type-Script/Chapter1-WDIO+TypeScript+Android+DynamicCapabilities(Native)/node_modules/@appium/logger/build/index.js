"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.markSensitive = void 0;
var log_1 = require("./lib/log");
Object.defineProperty(exports, "markSensitive", { enumerable: true, get: function () { return log_1.markSensitive; } });
const log_2 = __importDefault(require("./lib/log"));
exports.log = log_2.default;
exports.default = log_2.default;
//# sourceMappingURL=index.js.map