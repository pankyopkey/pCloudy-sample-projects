// src/protocol-stub.ts
import { capabilitiesEnvironmentDetector } from "@wdio/utils";
var NOOP = () => {
};
var ProtocolStub = class {
  static async newSession(options) {
    const capabilities = emulateSessionCapabilities(options.capabilities);
    const browser = {
      options,
      capabilities,
      requestedCapabilities: capabilities,
      customCommands: [],
      // internally used to transfer custom commands to the actual protocol instance
      overwrittenCommands: [],
      // internally used to transfer overwritten commands to the actual protocol instance
      commandList: [],
      getWindowHandle: NOOP,
      on: NOOP,
      off: NOOP,
      addCommand: NOOP,
      overwriteCommand: NOOP,
      ...capabilitiesEnvironmentDetector(capabilities)
    };
    browser.addCommand = (...args) => browser.customCommands.push(args);
    browser.overwriteCommand = (...args) => browser.overwrittenCommands.push(args);
    return browser;
  }
  /**
   * added just in case user wants to somehow reload webdriver before it was started.
   */
  static reloadSession() {
    throw new Error("Protocol Stub: Make sure to start the session before reloading it.");
  }
  static attachToSession(options, modifier) {
    if (options || !modifier) {
      throw new Error("You are trying to attach to a protocol stub, this should never occur, please file an issue.");
    }
    return modifier({
      commandList: []
    });
  }
};
function emulateSessionCapabilities(caps) {
  const capabilities = {};
  Object.entries(caps).forEach(([key, value]) => {
    const newKey = key.replace("appium:", "");
    capabilities[newKey] = value;
  });
  const c = "alwaysMatch" in caps ? caps.alwaysMatch : caps;
  if (c.browserName && c.browserName.toLowerCase() === "chrome") {
    capabilities["goog:chromeOptions"] = {};
  }
  return capabilities;
}
export {
  ProtocolStub as default
};
