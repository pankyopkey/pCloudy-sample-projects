const __importMetaUrl = require('url').pathToFileURL(__filename).href;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  $: () => $,
  $$: () => $$,
  _setGlobal: () => _setGlobal,
  browser: () => browser,
  driver: () => driver,
  expect: () => expect,
  multiremotebrowser: () => multiremotebrowser
});
module.exports = __toCommonJS(index_exports);
var globals = globalThis._wdioGlobals = globalThis._wdioGlobals || /* @__PURE__ */ new Map();
var GLOBALS_ERROR_MESSAGE = `No browser instance registered. Don't import @wdio/globals outside of the WDIO testrunner context. Or you have two two different "@wdio/globals" packages installed.`;
function proxyHandler(key) {
  return {
    get: (self, prop) => {
      if (!globals.has(key)) {
        throw new Error(GLOBALS_ERROR_MESSAGE);
      }
      const receiver = globals.get(key);
      const field = receiver[prop];
      return typeof field === "function" ? field.bind(receiver) : field;
    }
  };
}
var browser = new Proxy(
  class Browser {
  },
  proxyHandler("browser")
);
var driver = new Proxy(
  class Browser2 {
  },
  proxyHandler("driver")
);
var multiremotebrowser = new Proxy(
  class Browser3 {
  },
  proxyHandler("multiremotebrowser")
);
var $ = (...args) => {
  if (!globals.has("$")) {
    throw new Error(GLOBALS_ERROR_MESSAGE);
  }
  return globals.get("$")(...args);
};
var $$ = (...args) => {
  if (!globals.has("$$")) {
    throw new Error(GLOBALS_ERROR_MESSAGE);
  }
  return globals.get("$$")(...args);
};
var expect = (...args) => {
  if (!globals.has("expect")) {
    throw new Error(GLOBALS_ERROR_MESSAGE);
  }
  return globals.get("expect")(...args);
};
var ASYNC_MATCHERS = [
  "any",
  "anything",
  "arrayContaining",
  "objectContaining",
  "stringContaining",
  "stringMatching"
];
for (const matcher of ASYNC_MATCHERS) {
  expect[matcher] = (...args) => {
    if (!globals.has("expect")) {
      throw new Error(GLOBALS_ERROR_MESSAGE);
    }
    return globals.get("expect")[matcher](...args);
  };
}
expect.not = ASYNC_MATCHERS.reduce((acc, matcher) => {
  acc[matcher] = (...args) => {
    if (!globals.has("expect")) {
      throw new Error(GLOBALS_ERROR_MESSAGE);
    }
    return globals.get("expect").not[matcher](...args);
  };
  return acc;
}, {});
expect.extend = (...args) => {
  if (!globals.has("expect")) {
    throw new Error(GLOBALS_ERROR_MESSAGE);
  }
  const expect2 = globals.get("expect");
  return expect2.extend(...args);
};
function _setGlobal(key, value, setGlobal = true) {
  globals.set(key, value);
  if (setGlobal) {
    globalThis[key] = value;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $,
  $$,
  _setGlobal,
  browser,
  driver,
  expect,
  multiremotebrowser
});
