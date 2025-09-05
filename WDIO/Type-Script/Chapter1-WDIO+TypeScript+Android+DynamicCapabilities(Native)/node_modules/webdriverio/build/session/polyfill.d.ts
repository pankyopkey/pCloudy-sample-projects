import { SessionManager } from './session.js';
export declare function getPolyfillManager(browser: WebdriverIO.Browser): PolyfillManager;
/**
 * This class is responsible for setting polyfill scripts in the browser.
 */
export declare class PolyfillManager extends SessionManager {
    #private;
    constructor(browser: WebdriverIO.Browser);
    removeListeners(): void;
    initialize(): Promise<boolean>;
}
//# sourceMappingURL=polyfill.d.ts.map