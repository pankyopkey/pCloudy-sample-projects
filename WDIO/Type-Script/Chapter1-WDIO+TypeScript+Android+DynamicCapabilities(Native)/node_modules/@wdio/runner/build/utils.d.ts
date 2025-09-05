import type { Options, Capabilities } from '@wdio/types';
export interface ConfigWithSessionId extends Options.Testrunner {
    sessionId?: string;
    capabilities: Capabilities.RequestedStandaloneCapabilities;
}
/**
 * sanitizes wdio config from capability properties
 * @param  {Object} caps  desired session capabilities
 * @return {Object}       sanitized caps
 */
export declare function sanitizeCaps(capabilities: Capabilities.RequestedStandaloneCapabilities, filterOut?: boolean): Omit<WebdriverIO.Capabilities, 'logLevel'>;
/**
 * initialize browser instance depending whether remote or multiremote is requested
 * @param  {Object}  config        configuration of sessions
 * @param  {Object}  capabilities  desired session capabilities
 * @param  {boolean} isMultiremote isMultiremote
 * @return {Promise}               resolves with browser object
 */
export declare function initializeInstance(config: ConfigWithSessionId | WebdriverIO.Config, capabilities: Capabilities.RequestedStandaloneCapabilities | Capabilities.RequestedMultiremoteCapabilities, isMultiremote?: boolean): Promise<WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser>;
/**
 * Filter logTypes based on filter
 * @param  {string[]} excludeDriverLogs logTypes filter
 * @param  {string[]} driverLogTypes    available driver log types
 * @return {string[]}                   logTypes
 */
export declare function filterLogTypes(excludeDriverLogs: string[], driverLogTypes: string[]): string[];
type BrowserData = {
    sessionId: string;
    isW3C: boolean;
    protocol: string;
    hostname: string;
    port: number;
    path: string;
    queryParams: Record<string, string>;
};
/**
 * Gets { sessionId, isW3C, protocol, hostname, port, path, queryParams } of every Multiremote instance
 * @param {object} browser browser
 * @param {boolean} isMultiremote isMultiremote
 * @return {object}
 */
export declare function getInstancesData(browser: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser, isMultiremote: boolean): Record<string, Partial<BrowserData>> | undefined;
/**
 * utility function to transform assertion parameters into asymmetric matchers if necessary
 * @param arg raw value or a stringified asymmetric matcher
 * @returns   raw value or an actual asymmetric matcher
 */
export declare function transformExpectArgs(arg: unknown): unknown;
export {};
//# sourceMappingURL=utils.d.ts.map