// src/scripts/polyfill.ts
var polyfillFn = function webdriverioPolyfill() {
  var __defProp = Object.defineProperty;
  var __name = function(target, _value) {
    return __defProp(target, "name", { value: _value, configurable: true });
  };
  var __globalThis = typeof globalThis === "object" && globalThis || typeof window === "object" && window;
  __globalThis.__name = __name;
};
export {
  polyfillFn
};
