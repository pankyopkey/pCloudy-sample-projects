type SupportedGlobals = 'browser' | 'driver' | 'multiremotebrowser' | '$' | '$$' | 'expect';
declare global {
    var _wdioGlobals: Map<SupportedGlobals, any>;
    namespace WebdriverIO {
        interface Browser {
        }
        interface Element {
        }
        interface MultiRemoteBrowser {
        }
    }
}
export declare const browser: WebdriverIO.Browser;
export declare const driver: WebdriverIO.Browser;
export declare const multiremotebrowser: WebdriverIO.MultiRemoteBrowser;
export declare const $: WebdriverIO.Browser['$'];
export declare const $$: WebdriverIO.Browser['$$'];
export declare const expect: ExpectWebdriverIO.Expect;
/**
 * allows to set global property to be imported and used later on
 * @param key global key
 * @param value actual value to be returned
 * @private
 */
export declare function _setGlobal(key: SupportedGlobals, value: any, setGlobal?: boolean): void;
export {};
//# sourceMappingURL=index.d.ts.map