declare abstract class WebDriverError extends Error {
    #private;
    abstract url: URL;
    abstract opts: RequestInit;
    /**
     * return timeout error with information about the executing command on which the test hangs
     */
    computeErrorMessage(): string;
}
export declare class WebDriverRequestError extends WebDriverError {
    url: URL;
    opts: RequestInit;
    statusCode?: number;
    body?: unknown;
    code?: string;
    constructor(err: Error, url: URL, opts: RequestInit);
}
export declare class WebDriverResponseError extends WebDriverError {
    url: URL;
    opts: RequestInit;
    constructor(response: unknown, url: URL, opts: RequestInit);
}
export {};
//# sourceMappingURL=error.d.ts.map