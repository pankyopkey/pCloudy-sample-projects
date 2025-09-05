import type { JsonCompatible } from '@wdio/types';
import { type local, type remote } from 'webdriver';
import { URLPattern } from 'urlpattern-polyfill';
import type { MockFilterOptions, RequestWithOptions, RespondWithOptions } from './types.js';
import type { WaitForOptions } from '../../types.js';
type RespondBody = string | JsonCompatible | Buffer;
/**
 * Network interception class based on a WebDriver Bidi implementation.
 *
 * Note: this code is executed in Node.js and in the browser, so make sure
 *       you use primitives that work in both environments.
 */
export default class WebDriverInterception {
    #private;
    constructor(pattern: URLPattern, mockId: string, filterOptions: MockFilterOptions, browser: WebdriverIO.Browser);
    static initiate(url: string, filterOptions: MockFilterOptions, browser: WebdriverIO.Browser): Promise<WebDriverInterception>;
    /**
     * Get the raw binary data for a mock response by request ID
     * @param {string} requestId  The ID of the request to retrieve the binary response for
     * @returns {Buffer | null}   The binary data as a Buffer, or null if no matching binary response is found
     */
    getBinaryResponse(requestId: string): Buffer | null;
    /**
     * Simulate a responseStarted event for testing purposes
     * @param request NetworkResponseCompletedParameters to simulate
     */
    simulateResponseStarted(request: local.NetworkResponseCompletedParameters): void;
    debugResponseBodies(): Map<string, remote.NetworkBytesValue>;
    /**
     * allows access to all requests made with given pattern
     */
    get calls(): local.NetworkResponseCompletedParameters[];
    /**
     * Resets all information stored in the `mock.calls` set.
     */
    clear(): this;
    /**
     * Does what `mock.clear()` does and makes removes custom request overrides
     * and response overwrites
     */
    reset(): this;
    /**
     * Does everything that `mock.reset()` does, and also
     * removes any mocked return values or implementations.
     * Restored mock does not emit events and could not mock responses
     */
    restore(): Promise<this>;
    /**
     * Always use request modification for the next request done by the browser.
     * @param payload  payload to overwrite the request
     * @param once     apply overwrite only once for the next request
     * @returns        this instance to chain commands
     */
    request(overwrite: RequestWithOptions, once?: boolean): this;
    /**
     * alias for `mock.request(…, true)`
     */
    requestOnce(payload: RequestWithOptions): this;
    /**
     * Always respond with same overwrite
     * @param {*}       payload  payload to overwrite the response
     * @param {*}       params   additional respond parameters to overwrite
     * @param {boolean} once     apply overwrite only once for the next request
     * @returns                  this instance to chain commands
     */
    respond(payload: RespondBody, params?: Omit<RespondWithOptions, 'body'>, once?: boolean): this;
    /**
     * alias for `mock.respond(…, true)`
     */
    respondOnce(payload: RespondBody, params?: Omit<RespondWithOptions, 'body'>): this;
    /**
     * Abort the request with an error code
     * @param {string} errorReason  error code of the response
     * @param {boolean} once        if request should be aborted only once for the next request
     */
    abort(once?: boolean): this;
    /**
     * alias for `mock.abort(true)`
     */
    abortOnce(): this;
    /**
     * Redirect request to another URL
     * @param {string} redirectUrl  URL to redirect to
     * @param {boolean} sticky      if request should be redirected for all following requests
     */
    redirect(redirectUrl: string, once?: boolean): this;
    /**
     * alias for `mock.redirect(…, true)`
     */
    redirectOnce(redirectUrl: string): this;
    on(event: 'request', callback: (request: local.NetworkBeforeRequestSentParameters) => void): WebDriverInterception;
    on(event: 'match', callback: (match: local.NetworkBeforeRequestSentParameters) => void): WebDriverInterception;
    on(event: 'continue', callback: (requestId: string) => void): WebDriverInterception;
    on(event: 'fail', callback: (requestId: string) => void): WebDriverInterception;
    on(event: 'overwrite', callback: (response: local.NetworkResponseCompletedParameters) => void): WebDriverInterception;
    waitForResponse({ timeout, interval, timeoutMsg, }?: WaitForOptions): Promise<boolean> | Promise<Promise<boolean>>;
}
export declare function parseUrlPattern(url: string | URLPattern): URLPattern;
export {};
//# sourceMappingURL=index.d.ts.map