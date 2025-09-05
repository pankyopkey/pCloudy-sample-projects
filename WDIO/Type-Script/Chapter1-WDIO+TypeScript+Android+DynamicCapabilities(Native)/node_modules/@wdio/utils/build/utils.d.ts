import type { Options, Services } from '@wdio/types';
export declare const SLASH = "/";
export declare const REG_EXP_WINDOWS_ABS_PATH: RegExp;
export declare function isAbsolute(p: string): boolean;
/**
 * overwrite native element commands with user defined
 * @param {object} propertiesObject propertiesObject
 */
export declare function overwriteElementCommands(propertiesObject: {
    '__elementOverrides__'?: {
        value: Record<string, unknown>;
    };
    [key: string]: unknown;
}): void;
/**
 * get command call structure
 * (for logging purposes)
 */
export declare function commandCallStructure(commandName: string, args: unknown[], unfurl?: boolean): string;
/**
 * transforms WebDriver result for log stream to avoid unnecessary long
 * result strings e.g. if it contains a screenshot
 * @param {object} result WebDriver response body
 */
export declare function transformCommandLogResult(result: unknown): {} | null;
/**
 * checks if command argument is valid according to specification
 *
 * @param  {*}       arg           command argument
 * @param  {Object}  expectedType  parameter type (e.g. `number`, `string[]` or `(number|string)`)
 * @return {Boolean}               true if argument is valid
 */
export declare function isValidParameter(arg: unknown, expectedType: string): boolean;
/**
 * get type of command argument
 */
export declare function getArgumentType(arg: unknown): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null";
/**
 * Utility to import modules with user friendly error message
 * @param moduleName  The name of the module to import
 * @param namedImport The name of the import to return
 * @returns          The imported module
 */
export declare function userImport<T>(moduleName: string, namedImport?: string): Promise<T>;
/**
 * Allows to safely require a package, it only throws if the package was found
 * but failed to load due to syntax errors
 * @param  {string} name  of package
 * @return {object}       package content
 */
export declare function safeImport(name: string): Promise<Services.ServicePlugin | null>;
/**
 * is function async
 * @param  {Function} fn  function to check
 * @return {Boolean}      true provided function is async
 */
export declare function isFunctionAsync(fn: Function): boolean;
/**
 * filter out arguments passed to specFn & hookFn, don't allow callbacks
 * as there is no need for user to call e.g. `done()`
 */
export declare function filterSpecArgs(args: unknown[]): unknown[];
/**
 * checks if provided string is Base64
 * @param {string} str string to check
 * @return {boolean} `true` if the provided string is Base64
 */
export declare function isBase64(str: string): boolean;
/**
 * sleep
 * @param {number=0} ms number in ms to sleep
 */
export declare const sleep: (ms?: number) => Promise<unknown>;
/**
 * Checks if the provided WebdriverIO capabilities object is related to Appium.
 *
 * @param {WebdriverIO.Capabilities} caps - The capabilities object to check.
 * @returns {boolean} Returns true if the provided capabilities are related to Appium, false otherwise.
*/
export declare function isAppiumCapability(caps: WebdriverIO.Capabilities): boolean;
/**
 * helper method to determine if we need to setup a browser driver
 * which is:
 *   - whenever the user has set connection options that differ
 *     from the default, or a port is set
 *   - whenever the user defines `user` and `key` which later will
 *     update the connection options
 */
export declare function definesRemoteDriver(options: Pick<Options.WebDriver, 'user' | 'key' | 'protocol' | 'hostname' | 'port' | 'path'>): boolean;
export declare function isChrome(browserName?: string): boolean;
export declare function isSafari(browserName?: string): boolean;
export declare function isFirefox(browserName?: string): boolean;
export declare function isEdge(browserName?: string): boolean;
/**
 * traverse up the scope chain until browser element was reached
 */
export declare function getBrowserObject(elem: WebdriverIO.Element | WebdriverIO.Browser | WebdriverIO.ElementArray): WebdriverIO.Browser;
/**
 * Enables logging to a file in a specified directory.
 * @param  {string} outputDir  Directory containing the log file
 */
export declare function enableFileLogging(outputDir?: string): Promise<void>;
//# sourceMappingURL=utils.d.ts.map