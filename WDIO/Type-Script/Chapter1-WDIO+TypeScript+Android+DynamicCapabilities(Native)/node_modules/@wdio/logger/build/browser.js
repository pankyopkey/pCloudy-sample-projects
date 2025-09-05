// src/browser.ts
var LOG_METHODS = ["error", "warn", "info", "debug", "trace", "silent"];
var SENSITIVE_DATA_REPLACER = "**MASKED**";
function getLogger(component) {
  return LOG_METHODS.reduce((acc, cur) => {
    const prop = cur;
    if (console[prop]) {
      acc[prop] = console[prop].bind(console, "".concat(component, ":"));
    }
    return acc;
  }, {});
}
getLogger.setLevel = () => {
};
getLogger.setLogLevelsConfig = () => {
};
getLogger.setMaskingPatterns = () => {
};
getLogger.waitForBuffer = () => {
};
getLogger.clearLogger = () => {
};
export {
  SENSITIVE_DATA_REPLACER,
  getLogger as default
};
