import type { ProtocolCommandResponse } from '../types.js';
export default interface SaucelabsCommands {
    /**
     * Saucelabs Protocol Command
     *
     * Get webpage specific log information based on the last page load.
     * @ref https://docs.saucelabs.com/insights/debug/#network-logs
     *
     * @example
     * ```js
     * // Get Network Logs
     * console.log(browser.getPageLogs('sauce:network'));
     * //
     * // outputs:
     * // [{
     * //   "url": "https://app.saucelabs.com/dashboard",
     * //   "statusCode": 200,
     * //   "method": "GET",
     * //   "requestHeaders": {
     * //     ...
     * //   },
     * //   "responseHeaders": {
     * //     ...
     * //   },
     * //   "timing": {
     * //     ...
     * //   }
     * // }, {,
     * //   ...
     * // }]
     * //
     * ```*
     * @example
     * ```js
     * // Get Performance Logs (needs capturePerformance capability see: https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
     * console.log(browser.getPageLogs('sauce:performance'));
     * //
     * // outputs:
     * // {
     * //   "speedIndex": 1472.023,
     * //   "timeToFirstInteractive": 1243.214,
     * //   "firstMeaningfulPaint": 892.643,
     * //   ...
     * // }
     * //
     * ```
     */
    getPageLogs(type: string): Promise<ProtocolCommandResponse>;
    /**
     * Saucelabs Protocol Command
     *
     * With network conditioning you can test your site on a variety of network connections, including Edge, 3G, and even offline. You can throttle the data throughput, including the maximum download and upload throughput, and use latency manipulation to enforce a minimum delay in connection round-trip time (RTT).
     * @ref https://docs.saucelabs.com/insights/debug/#saucethrottlenetwork
     *
     * @example
     * ```js
     * // predefined network condition
     * browser.sauceThrottleNetwork('offline')
     * ```*
     * @example
     * ```js
     * // custom network condition
     * browser.sauceThrottleNetwork({
     *   download: 1000,
     *   upload: 500,
     *   latency: 40'
     * })
     * ```
     */
    sauceThrottleNetwork(condition: (string | object)): Promise<void>;
    /**
     * Saucelabs Protocol Command
     *
     * You can throttle the CPU in DevTools to understand how your page performs under that constraint.
     * @ref https://docs.saucelabs.com/insights/debug/#saucethrottlecpu
     *
     * @example
     * ```js
     * // throttle CPU and make it run 4x slower
     * browser.throttleCPU(4)
     * ```*
     * @example
     * ```js
     * // reset CPU throttling
     * browser.throttleCPU(0)
     * ```
     */
    throttleCPU(rate: number): Promise<void>;
    /**
     * Saucelabs Protocol Command
     *
     * Allows modifying any request made by the browser. You can blacklist, modify, or redirect these as required for your tests.
     * @ref https://docs.saucelabs.com/insights/debug/#intercept-network-requests
     *
     * @example
     * ```js
     * // redirect a request
     * browser.interceptRequest({
     *   url: 'https://saucelabs.com',
     *   redirect: 'https://google.com'
     * })
     * ```*
     * @example
     * ```js
     * // Blacklist requests to 3rd party vendors
     * browser.interceptRequest({
     *   url: 'https://api.segment.io/v1/p',
     *   error: 'Failed'
     * })
     * ```*
     * @example
     * ```js
     * // Modify requests to REST API (Mock REST API response)
     * browser.interceptRequest({
     *   url: 'http://sampleapp.appspot.com/api/todos',
     *   response: {
     *     headers: {
     *       'x-custom-headers': 'foobar'
     *     },
     *     body: [{
     *       title: 'My custom todo',
     *       order: 1,
     *       completed: false,
     *       url: 'http://todo-backend-express.herokuapp.com/15727'
     *     }]
     *   }
     * })
     * ```
     */
    interceptRequest(rule: object): Promise<void>;
    /**
     * Saucelabs Protocol Command
     *
     * Assert against the performance baseline of your app.
     * @ref https://docs.saucelabs.com/performance/transitions/#setting-performance-capabilities
     *
     * @example
     * ```js
     * // test performance for a page
     * browser.url('https://webdriver.io')
     * const hasRegression = browser.assertPerformance({
     *   name: 'my performance test', // make sure that the name is also set in the sauce options in your capabilities
     *   metrics: ['score', 'firstPaint']
     * })
     * ```
     */
    assertPerformance(name: string, metrics?: string[]): Promise<ProtocolCommandResponse>;
    /**
     * Saucelabs Protocol Command
     *
     * Perform a scroll test that evaluates the jankiness of the application.
     * @ref https://docs.saucelabs.com/performance/motion/#implementing-the-jankiness-custom-command
     *
     * @example
     * ```js
     * // test performance for a page
     * browser.url('https://webdriver.io')
     * browser.jankinessCheck()
     * ```
     */
    jankinessCheck(): Promise<ProtocolCommandResponse>;
    /**
     * Saucelabs Protocol Command
     *
     * Mocks a network resource.
     * @ref https://docs.saucelabs.com/
     *
     */
    mockRequest(url: string, filterOptions?: object): Promise<ProtocolCommandResponse>;
    /**
     * Saucelabs Protocol Command
     *
     * Receive request information about requests that match the mocked resource.
     * @ref https://docs.saucelabs.com/
     *
     */
    getMockCalls(mockId: string): Promise<ProtocolCommandResponse>;
    /**
     * Saucelabs Protocol Command
     *
     * Clear list of mock calls.
     * @ref https://docs.saucelabs.com/
     *
     */
    clearMockCalls(mockId: string, restore?: boolean): Promise<void>;
    /**
     * Saucelabs Protocol Command
     *
     * Respond if mock matches a specific resource.
     * @ref https://docs.saucelabs.com/
     *
     */
    respondMock(mockId: string, payload?: object): Promise<void>;
}
//# sourceMappingURL=saucelabs.d.ts.map