export declare class SessionManager {
    #private;
    /**
     * SessionManager constructor
     * Logic in here should be executed for all session singletons, e.g. remove instance
     * of itself when a session was deleted.
     * @param browser WebdriverIO.Browser
     * @param scope   scope of the session manager, e.g. context, network etc.
     */
    constructor(browser: WebdriverIO.Browser, scope: string);
    removeListeners(): void;
    initialize(): unknown;
    /**
     * check if session manager should be enabled, if
     */
    isEnabled(): boolean;
    static getSessionManager<T extends SessionManager>(browser: WebdriverIO.Browser, Manager: new (browser: WebdriverIO.Browser) => T): T;
}
//# sourceMappingURL=session.d.ts.map