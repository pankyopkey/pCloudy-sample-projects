const __importMetaUrl = require('url').pathToFileURL(__filename).href;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.cts
exports.SevereServiceError = class SevereServiceError extends Error {
  constructor(message = "Severe Service Error occurred.") {
    super(message);
    this.name = "SevereServiceError";
  }
};
exports.Key = {
  Ctrl: "WDIO_CONTROL",
  NULL: "\uE000",
  Cancel: "\uE001",
  Help: "\uE002",
  Backspace: "\uE003",
  Tab: "\uE004",
  Clear: "\uE005",
  Return: "\uE006",
  Enter: "\uE007",
  Shift: "\uE008",
  Control: "\uE009",
  Alt: "\uE00A",
  Pause: "\uE00B",
  Escape: "\uE00C",
  Space: "\uE00D",
  PageUp: "\uE00E",
  PageDown: "\uE00F",
  End: "\uE010",
  Home: "\uE011",
  ArrowLeft: "\uE012",
  ArrowUp: "\uE013",
  ArrowRight: "\uE014",
  ArrowDown: "\uE015",
  Insert: "\uE016",
  Delete: "\uE017",
  Semicolon: "\uE018",
  Equals: "\uE019",
  Numpad0: "\uE01A",
  Numpad1: "\uE01B",
  Numpad2: "\uE01C",
  Numpad3: "\uE01D",
  Numpad4: "\uE01E",
  Numpad5: "\uE01F",
  Numpad6: "\uE020",
  Numpad7: "\uE021",
  Numpad8: "\uE022",
  Numpad9: "\uE023",
  Multiply: "\uE024",
  Add: "\uE025",
  Separator: "\uE026",
  Subtract: "\uE027",
  Decimal: "\uE028",
  Divide: "\uE029",
  F1: "\uE031",
  F2: "\uE032",
  F3: "\uE033",
  F4: "\uE034",
  F5: "\uE035",
  F6: "\uE036",
  F7: "\uE037",
  F8: "\uE038",
  F9: "\uE039",
  F10: "\uE03A",
  F11: "\uE03B",
  F12: "\uE03C",
  Command: "\uE03D",
  ZenkakuHankaku: "\uE040"
};
exports.remote = async function(params, remoteModifier) {
  const { remote } = await import("./node.js");
  return remote(params, remoteModifier);
};
exports.attach = async function(attachOptions) {
  const { attach } = await import("./node.js");
  return attach(attachOptions);
};
exports.multiremote = async function(params, { automationProtocol } = {}) {
  const { multiremote } = await import("./node.js");
  return multiremote(params, { automationProtocol });
};
