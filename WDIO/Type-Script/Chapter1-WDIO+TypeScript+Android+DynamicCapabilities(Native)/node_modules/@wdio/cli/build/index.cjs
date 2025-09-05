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
var Launcher = class {
  #esmLauncher;
  constructor(configFilePath, args = {}, isWatchMode = false) {
    this.#esmLauncher = import("./index.js").then(
      ({ Launcher: Launcher2 }) => new Launcher2(configFilePath, args, isWatchMode)
    );
  }
  /**
   * run sequence
   * @return  {Promise}  that only gets resolved with either an exitCode or an error
   */
  async run() {
    return (await this.#esmLauncher).run();
  }
};
async function run() {
  const { run: run2 } = await import("./index.js");
  return run2();
}
module.exports = { Launcher, run };
