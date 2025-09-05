import type { EventEmitter } from 'node:events';
import type { CommandEndpoint } from '@wdio/protocols';
import type { Options } from '@wdio/types';
import type { Client, JSONWPCommandError, SessionFlags, RemoteConfig, CommandRuntimeOptions } from './types.js';
/**
 * start browser session with WebDriver protocol
 */
export declare function startWebDriverSession(params: RemoteConfig): Promise<{
    sessionId: string;
    capabilities: WebdriverIO.Capabilities;
}>;
/**
 * Validates the given WebdriverIO capabilities.
 *
 * @param {WebdriverIO.Capabilities} capabilities - The capabilities to validate.
 * @throws {Error} If the capabilities contain incognito mode.
 */
export declare function validateCapabilities(capabilities: WebdriverIO.Capabilities): void;
/**
 * check if WebDriver requests was successful
 * @param  {number}  statusCode status code of request
 * @param  {Object}  body       body payload of response
 * @return {Boolean}            true if request was successful
 */
export declare function isSuccessfulResponse(statusCode?: number, body?: unknown): boolean;
/**
 * creates the base prototype for the webdriver monad
 */
export declare function getPrototype({ isW3C, isChromium, isFirefox, isMobile, isSauce, isSeleniumStandalone }: Partial<SessionFlags>): Record<string, PropertyDescriptor>;
/**
 * return all supported flags and return them in a format so we can attach them
 * to the instance protocol
 * @param  {Object} options   driver instance or option object containing these flags
 * @return {Object}           prototype object
 */
export declare function getEnvironmentVars({ isW3C, isMobile, isIOS, isAndroid, isFirefox, isSauce, isSeleniumStandalone, isChromium, isWindowsApp, isMacApp }: Partial<SessionFlags>): PropertyDescriptorMap;
/**
 * Decorate the client's options object with host updates based on the presence of
 * directConnect capabilities in the new session response. Note that this
 * mutates the object.
 * @param  {Client} params post-new-session client
 */
export declare function setupDirectConnect(client: Client): void;
/**
 * get human-readable message from response error
 * @param {Error} err response error
 * @param params
 */
export declare const getSessionError: (err: JSONWPCommandError, params?: Partial<Options.WebDriver>) => string;
/**
 * Enhance the monad with WebDriver Bidi primitives if a connection can be established successfully
 * @param socketUrl url to bidi interface
 * @param strictSSL
 * @param userHeaders
 * @returns prototype with interface for bidi primitives
 */
export declare function initiateBidi(socketUrl: string, strictSSL?: boolean, userHeaders?: Record<string, string>): PropertyDescriptorMap;
export declare function parseBidiMessage(this: EventEmitter, data: ArrayBuffer): void;
/**
 * Masks the `text` parameter in a WebDriver command if masking is enabled in the options.
 *
 * - If `options.mask` is not set or the command does not have a `text` parameter, returns the original body and args.
 * - If masking is enabled and a `text` parameter is present and non-empty, replaces its value with the mask in both the body and args.
 *
 * @param {CommandEndpoint} commandInfo - The command endpoint metadata, including parameters and variables.
 * @param {CommandRuntimeOptions} options - Runtime options for the command, including the `mask` flag.
 * @param {Record<string, unknown>} body - The request body object to potentially mask.
 * @param {unknown[]} args - The arguments array to potentially mask.
 * @returns {{
 *   maskedBody: Record<string, unknown>,
 *   maskedArgs: unknown[],
 *   isMasked: boolean
 * }} An object containing the (possibly) masked body and args, and a flag indicating if masking was applied.
 */
export declare function mask(commandInfo: CommandEndpoint, options: CommandRuntimeOptions, body: Record<string, unknown>, args: unknown[]): {
    maskedBody: Record<string, unknown>;
    maskedArgs: unknown[];
    isMasked: boolean;
};
//# sourceMappingURL=utils.d.ts.map