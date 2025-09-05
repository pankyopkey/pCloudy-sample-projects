import type { Frameworks, Services, Options } from '@wdio/types';
/**
 * we have to mock the WebdriverIO.Browser and WebdriverIO.MultiRemoteBrowser type
 * here as this package can't access it given it is a dependency of webdriverio
 */
interface WebdriverIOInstance extends Services.Hooks {
    selector: string;
    parent: WebdriverIOInstance;
    length: number;
    options: Options.Testrunner;
    waitUntil: Function;
    $$: Function;
    foundWith: string;
    wdioRetries: number;
    [i: number]: WebdriverIOInstance;
}
export declare function executeHooksWithArgs<T>(this: unknown, hookName: string, hooks?: Function | Function[], args?: unknown[]): Promise<(T | Error)[]>;
/**
 * wrap command to enable before and after command to be executed
 * @param commandName name of the command (e.g. getTitle)
 * @param fn          command function
 */
export declare function wrapCommand<T>(commandName: string, fn: Function): (...args: unknown[]) => Promise<T>;
/**
 * execute test or hook asynchronously
 *
 * @param  {Function} fn         spec or hook method
 * @param  {object}   retries    { limit: number, attempts: number }
 * @param  {Array}    args       arguments passed to hook
 * @param  {number}   timeout    The maximum time (in milliseconds) to wait for the function to complete
 * @return {Promise}             that gets resolved once test/hook is done or was retried enough
 */
export declare function executeAsync(this: WebdriverIOInstance, fn: Function, retries: Frameworks.TestRetries, args?: unknown[], timeout?: number): Promise<unknown>;
export {};
//# sourceMappingURL=shim.d.ts.map