// src/Workers.ts
var MESSAGE_TYPES = /* @__PURE__ */ ((MESSAGE_TYPES2) => {
  MESSAGE_TYPES2[MESSAGE_TYPES2["consoleMessage"] = 0] = "consoleMessage";
  MESSAGE_TYPES2[MESSAGE_TYPES2["commandRequestMessage"] = 1] = "commandRequestMessage";
  MESSAGE_TYPES2[MESSAGE_TYPES2["commandResponseMessage"] = 2] = "commandResponseMessage";
  MESSAGE_TYPES2[MESSAGE_TYPES2["hookTriggerMessage"] = 3] = "hookTriggerMessage";
  MESSAGE_TYPES2[MESSAGE_TYPES2["hookResultMessage"] = 4] = "hookResultMessage";
  MESSAGE_TYPES2[MESSAGE_TYPES2["expectRequestMessage"] = 5] = "expectRequestMessage";
  MESSAGE_TYPES2[MESSAGE_TYPES2["expectResponseMessage"] = 6] = "expectResponseMessage";
  MESSAGE_TYPES2[MESSAGE_TYPES2["expectMatchersRequest"] = 7] = "expectMatchersRequest";
  MESSAGE_TYPES2[MESSAGE_TYPES2["expectMatchersResponse"] = 8] = "expectMatchersResponse";
  MESSAGE_TYPES2[MESSAGE_TYPES2["coverageMap"] = 9] = "coverageMap";
  MESSAGE_TYPES2[MESSAGE_TYPES2["customCommand"] = 10] = "customCommand";
  MESSAGE_TYPES2[MESSAGE_TYPES2["initiateBrowserStateRequest"] = 11] = "initiateBrowserStateRequest";
  MESSAGE_TYPES2[MESSAGE_TYPES2["initiateBrowserStateResponse"] = 12] = "initiateBrowserStateResponse";
  MESSAGE_TYPES2[MESSAGE_TYPES2["browserTestResult"] = 13] = "browserTestResult";
  return MESSAGE_TYPES2;
})(MESSAGE_TYPES || {});
export {
  MESSAGE_TYPES
};
