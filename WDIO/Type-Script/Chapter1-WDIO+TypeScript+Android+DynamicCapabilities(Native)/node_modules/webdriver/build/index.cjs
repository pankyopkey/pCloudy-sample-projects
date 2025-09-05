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
var esmModule = import("./node.js");
function command(method, encodeUri, commandInfo, doubleEncodeVariables = false) {
  return async function protocolCommand(...args) {
    const commandESM = await esmModule;
    return commandESM.command(method, encodeUri, commandInfo, doubleEncodeVariables).apply(this, args);
  };
}
var WebDriver = class _WebDriver {
  static async newSession(options, modifier, userPrototype = {}, customCommandWrapper) {
    const WebDriver2 = (await esmModule).WebDriver;
    return WebDriver2.newSession(options, modifier, userPrototype, customCommandWrapper);
  }
  /**
   * allows user to attach to existing sessions
   */
  static async attachToSession(options, modifier, userPrototype = {}, commandWrapper) {
    const WebDriver2 = (await esmModule).WebDriver;
    return WebDriver2.attachToSession(options, modifier, userPrototype, commandWrapper);
  }
  /**
   * Changes The instance session id and browser capabilities for the new session
   * directly into the passed in browser object!!
   *
   * @param   {object} instance  the object we get from a new browser session.
   * @returns {string}           the new session id of the browser
   */
  static async reloadSession(instance) {
    const WebDriver2 = (await esmModule).WebDriver;
    return WebDriver2.reloadSession(instance);
  }
  static get WebDriver() {
    return _WebDriver;
  }
  static get command() {
    return command;
  }
};
module.exports = WebDriver;
exports.command = command;
