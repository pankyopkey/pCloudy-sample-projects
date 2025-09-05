import type { Capabilities } from '@wdio/types';
/**
 * check if session is based on W3C protocol based on the /session response
 * @param  {Object}  capabilities  caps of session response
 * @return {Boolean}               true if W3C (browser)
 */
export declare function isW3C(capabilities?: WebdriverIO.Capabilities): boolean;
/**
 * Detects if session has support for WebDriver Bidi.
 * @param  {object}  capabilities resolved session capabilities send back from the driver
 * @return {Boolean}              true if session has WebDriver Bidi support
 */
export declare function isBidi(capabilities: WebdriverIO.Capabilities): boolean;
/**
 * returns information about the environment before the session is created
 * @param  {Object}  capabilities           caps provided by user
 * @return {Object}                         object with environment flags
 */
export declare function capabilitiesEnvironmentDetector(capabilities: WebdriverIO.Capabilities): {
    isChrome: boolean;
    isFirefox: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
    isBidi: boolean;
    isChromium: boolean;
    isWindowsApp: boolean;
    isMacApp: boolean;
};
/**
 * returns information about the environment when the session is created
 * @param  {Object}  capabilities           caps of session response
 * @param  {Object}  requestedCapabilities
 * @return {Object}                         object with environment flags
 */
export declare function sessionEnvironmentDetector({ capabilities, requestedCapabilities }: {
    capabilities: WebdriverIO.Capabilities;
    requestedCapabilities: Capabilities.RequestedStandaloneCapabilities;
}): {
    isW3C: boolean;
    isChrome: boolean;
    isFirefox: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
    isSeleniumStandalone: boolean;
    isBidi: boolean;
    isChromium: boolean;
    isWindowsApp: boolean;
    isMacApp: boolean;
};
//# sourceMappingURL=envDetector.d.ts.map