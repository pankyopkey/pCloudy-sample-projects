import { SessionManager } from './session.js';
export declare function getNetworkManager(browser: WebdriverIO.Browser): NetworkManager;
/**
 * This class is responsible for managing shadow roots and their elements.
 * It allows to do deep element lookups and pierce into shadow DOMs across
 * all components of a page.
 */
export declare class NetworkManager extends SessionManager {
    #private;
    constructor(browser: WebdriverIO.Browser);
    removeListeners(): void;
    initialize(): Promise<boolean>;
    getRequestResponseData(navigationId: string): WebdriverIO.Request | undefined;
    /**
     * Returns the number of requests that are currently pending.
     * @param context browsing context id
     * @returns the number of requests that are currently pending
     */
    getPendingRequests(navigationId: string): WebdriverIO.Request[];
}
//# sourceMappingURL=networkManager.d.ts.map