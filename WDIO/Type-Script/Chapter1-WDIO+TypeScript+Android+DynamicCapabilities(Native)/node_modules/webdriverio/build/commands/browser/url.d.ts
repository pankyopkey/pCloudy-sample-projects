type WaitState = 'none' | 'interactive' | 'networkIdle' | 'complete';
/**
 *
 * The `url` command loads an URL in the browser. If a baseUrl is specified in the config,
 * it will be prepended to the url parameter using node's url.resolve() method. Calling
 * `browser.url('...')` with the same url as last time will trigger a page reload. However,
 * if the url contains a hash, the browser will not trigger a new navigation and the user
 * has to [refresh](/docs/api/webdriver#refresh) the page to trigger one.
 *
 * The command returns an `WebdriverIO.Request` object that contains information about the
 * request and response data of the page load:
 *
 * ```ts
 * interface WebdriverIO.Request {
 *   id?: string
 *   url: string
 *   timestamp: number
 *   navigation?: string
 *   redirectChain?: string[],
 *   headers: Record<string, string>
 *   cookies?: NetworkCookie[]
 *   \/**
 *    * Error message if request failed
 *    *\/
 *   error?: string
 *   response?: {
 *       fromCache: boolean
 *       headers: Record<string, string>
 *       mimeType: string
 *       status: number
 *   },
 *   /**
 *    * List of all requests that were made due to the main request.
 *    * Note: the list may be incomplete and does not contain request that were
 *    * made after the command has finished.
 *    *
 *    * The property will be undefined if the request is not a document request
 *    * that was initiated by the browser.
 *    *\/
 *   children?: Request[]
 * }
 * ```
 *
 * The command supports the following options:
 *
 * :::note
 *
 * These features unfortunately won't be available to you if your remote environment doesn't support WebDriver Bidi. You can check if Bidi is support in your session by looking into the `browser.isBidi` property.
 *
 * :::
 *
 * ### wait
 * The desired state the requested resource should be in before finishing the command.
 * It supports the following states:
 *
 *  - `none`: no wait after the page request is made and the response is received
 *  - `interactive`: wait until the page is interactive
 *  - `complete`: wait until the DOM tree of the page is fully loaded
 *  - `networkIdle`: wait until there are no pending network requests
 *
 * ### headers
 *
 * Headers to be sent with the request.
 *
 * __Default:__ `{}`
 *
 * ### auth
 *
 * Basic authentication credentials.
 * Note: this will overwrite the existing `Authorization` header if provided in the `headers` option.
 *
 * ### timeout
 *
 * If set to a number, the command will wait for the specified amount of milliseconds for the page to load
 * all responses before returning.
 *
 * Note: for this to have an impact, it requires the `wait` option to be set to `networkIdle`.
 *
 * __Default:__ `5000`
 *
 * <example>
    :url.js
    // navigate to a new URL
    const request = await browser.url('https://webdriver.io');
    // log url
    console.log(request.url); // outputs: "https://webdriver.io"
    console.log(request.response?.status); // outputs: 200
    console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

    :baseUrlResolutions.js
    // With a base URL of http://example.com/site, the following url parameters resolve as such:
    // When providing a scheme:
    // https://webdriver.io
    await browser.url('https://webdriver.io');

    // When not starting with a slash, the URL resolves relative to the baseUrl
    // http://example.com/site/relative
    await browser.url('relative');

    // When starting with a slash, the URL resolves relative to the root path of the baseUrl
    // http://example.com/rootRelative
    await browser.url('/rootRelative');

    :basicAuth.js
    // navigate to a URL with basic authentication
    await browser.url('https://the-internet.herokuapp.com/basic_auth', {
        auth: {
            user
            pass
        }
    });
    await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

    :onBeforeLoad.js
    // navigate to a URL and mock the battery API
    await browser.url('https://pazguille.github.io/demo-battery-api/', {
        onBeforeLoad (win) {
            // mock "navigator.battery" property
            // returning mock charge object
            win.navigator.getBattery = () => Promise.resolve({
                level: 0.5,
                charging: false,
                chargingTime: Infinity,
                dischargingTime: 3600, // seconds
            })
        }
    })
    // now we can assert actual text - we are charged at 50%
    await expect($('.battery-percentage')).toHaveText('50%')
    // and has enough juice for 1 hour
    await expect($('.battery-remaining')).toHaveText('01:00)
 * </example>
 *
 * @param {string=} url  the URL to navigate to
 * @param {UrlOptions=} options  navigation options
 * @param {'none'|'interactive'|'networkIdle'|'complete'} [options.wait]  The desired state the requested resource should be in before finishing the command. Default: 'complete'
 * @param {number=} options.timeout  If set to a number, the command will wait for the specified amount of milliseconds for the page to load
 * all responses before returning. Default: 5000
 * @param {Function=} options.onBeforeLoad  A function that is being called before your page has loaded all of its resources. It allows you to easily
 * mock the environment, e.g. overwrite Web APIs that your application uses.
 * @param {`{user: string, pass: string}`=} options.auth  basic authentication credentials
 * @param {`Record<string, string>`=} options.headers  headers to be sent with the request
 * @returns {WebdriverIO.Request} a request object of the page load with information about the request and response data
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-get
 * @see  https://nodejs.org/api/url.html#url_url_resolve_from_to
 * @type protocol
 *
 */
export declare function url(this: WebdriverIO.Browser, path: string, options?: UrlCommandOptions): Promise<WebdriverIO.Request | void>;
interface UrlCommandOptions {
    /**
     * The desired state the requested resource should be in before finishing the command.
     * It supports the following states:
     *
     *  - `none`: no wait after the page request is made and the response is received
     *  - `interactive`: wait until the page is interactive
     *  - `complete`: wait until the DOM tree of the page is fully loaded
     *  - `networkIdle`: wait until there are no pending network requests
     *
     * @default 'complete'
     */
    wait?: WaitState;
    /**
     * Headers to be sent with the request.
     * @default {}
     */
    headers?: Record<string, string>;
    /**
     * Basic authentication credentials
     * Note: this will overwrite the existing `Authorization` header if provided in the `headers` option
     */
    auth?: {
        user: string;
        pass: string;
    };
    /**
     * If set to a number, the command will wait for the specified amount of milliseconds for the page to load
     * all responses before returning.
     *
     * Note: for this to have an impact, it requires the `wait` option to be set to `networkIdle`
     *
     * @default 5000
     */
    timeout?: number;
    /**
     * A function that is being called before your page has loaded all of its resources. It allows you to easily
     * mock the environment, e.g. overwrite Web APIs that your application uses.
     *
     * Note: the provided function is being serialized and executed in the browser context. You can not pass in variables
     * from the Node.js context. Furthermore changes to the environment only apply for this specific page load.
     * Checkout `browser.addPreloadScript` for a more versatile way to mock the environment.
     */
    onBeforeLoad?: () => unknown;
}
export {};
//# sourceMappingURL=url.d.ts.map