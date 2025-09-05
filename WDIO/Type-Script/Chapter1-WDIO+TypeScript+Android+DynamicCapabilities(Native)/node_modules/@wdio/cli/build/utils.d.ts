import { SevereServiceError } from 'webdriverio';
import type { Capabilities, Services } from '@wdio/types';
import type { OnCompleteResult, ReplCommandArguments } from './types.js';
export declare class HookError extends SevereServiceError {
    origin: string;
    constructor(message: string, origin: string);
}
/**
 * run service launch sequences
 */
export declare function runServiceHook(launcher: Services.ServiceInstance[], hookName: keyof Services.HookFunctions, ...args: unknown[]): Promise<undefined>;
/**
 * Run hook in service launcher
 * @param {Array|Function} hook - can be array of functions or single function
 * @param {object} config
 * @param {object} capabilities
 */
export declare function runLauncherHook(hook: Function | Function[], ...args: unknown[]): Promise<void | any[]>;
/**
 * Run onCompleteHook in Launcher
 * @param {Array|Function} onCompleteHook - can be array of functions or single function
 * @param {*} config
 * @param {*} capabilities
 * @param {*} exitCode
 * @param {*} results
 */
export declare function runOnCompleteHook(onCompleteHook: Function | Function[], config: WebdriverIO.Config, capabilities: Capabilities.TestrunnerCapabilities, exitCode: number, results: OnCompleteResult): Promise<(0 | 1)[]>;
/**
 * get runner identification by caps
 */
export declare function getRunnerName(caps?: WebdriverIO.Capabilities): string;
export declare function findInConfig(config: string, type: string): RegExpMatchArray | null;
export declare function getCapabilities(arg: ReplCommandArguments): Promise<{
    capabilities: {
        deviceName: string;
        platformVersion: string;
        udid: string;
        platformName: string;
        automationName: string;
        app: string;
        browserName?: undefined;
    };
} | {
    capabilities: {
        deviceName: string;
        platformVersion: string;
        udid: string;
        platformName: string;
        automationName: string;
        browserName: string;
    };
} | {
    capabilities: {
        alwaysMatch: WebdriverIO.Capabilities;
        firstMatch: WebdriverIO.Capabilities[];
        browserName?: undefined;
    };
} | {
    capabilities: {
        browserName: string;
    };
}>;
type CLIParams = {
    [x: string]: boolean | string | number | (string | boolean | number)[];
};
export declare function coerceOpts(types: Record<string, string>, opts: CLIParams): CLIParams;
export declare function coerceOptsFor(framework: 'cucumber' | 'mocha' | 'jasmine'): (opts: CLIParams) => CLIParams;
declare enum NodeVersion {
    'major' = 0,
    'minor' = 1,
    'patch' = 2
}
export declare function nodeVersion(type: keyof typeof NodeVersion): number;
export {};
//# sourceMappingURL=utils.d.ts.map