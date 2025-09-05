import type { FormattedMessage, FrameworkMessage, MochaOpts } from './types.js';
export declare function formatMessage(params: FrameworkMessage): FormattedMessage;
/**
 * require external modules
 * @param mods list of modules to load before the test starts
 * @param loader  function to import the module, optional and for testing purposes only
 */
export declare function requireExternalModules(mods: string[], loader?: typeof loadModule): Promise<any>[];
type Hook = Function | Function[];
export declare function setupEnv(cid: string, options: MochaOpts, beforeTest: Hook, beforeHook: Hook, afterTest: Hook, afterHook: Hook): Promise<any>[];
export declare function loadModule(name: string): Promise<any>;
export {};
//# sourceMappingURL=common.d.ts.map