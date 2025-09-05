import type { ProtocolCommandResponse } from '../types.js';
export default interface SeleniumCommands {
    /**
     * Selenium Protocol Command
     *
     * Upload a file to remote machine on which the browser is running.
     * @ref https://www.seleniumhq.org/
     *
     */
    file(file: string): Promise<string>;
    /**
     * Selenium Protocol Command
     *
     * List files from remote machine available for download.
     * @ref https://www.seleniumhq.org/
     *
     */
    getDownloadableFiles(): Promise<ProtocolCommandResponse>;
    /**
     * Selenium Protocol Command
     *
     * Download a file from remote machine on which the browser is running.
     * @ref https://www.seleniumhq.org/
     *
     */
    download(name: string): Promise<ProtocolCommandResponse>;
    /**
     * Selenium Protocol Command
     *
     * Remove all downloadable files from remote machine on which the browser is running.
     * @ref https://www.seleniumhq.org/
     *
     */
    deleteDownloadableFiles(): Promise<void>;
    /**
     * Selenium Protocol Command
     *
     * Receive hub config remotely.
     * @ref https://github.com/nicegraham/selenium-grid2-api#gridapihub
     *
     */
    getHubConfig(): Promise<ProtocolCommandResponse>;
    /**
     * Selenium Protocol Command
     *
     * Get the details of the Selenium Grid node running a session.
     * @ref https://github.com/nicegraham/selenium-grid2-api#gridapitestsession
     *
     */
    gridTestSession(session: string): Promise<ProtocolCommandResponse>;
    /**
     * Selenium Protocol Command
     *
     * Get proxy details.
     * @ref https://github.com/nicegraham/selenium-grid2-api#gridapiproxy
     *
     */
    gridProxyDetails(id: string): Promise<ProtocolCommandResponse>;
    /**
     * Selenium Protocol Command
     *
     * Manage lifecycle of hub node.
     * @ref https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager
     *
     */
    manageSeleniumHubLifecycle(action: string): Promise<void>;
    /**
     * Selenium Protocol Command
     *
     * Send GraphQL queries to the Selenium (hub or node) server to fetch data. (Only supported with Selenium v4 Server)
     * @ref https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/
     *
     * @example
     * ```js
     * const result = await browser.queryGrid('{ nodesInfo { nodes { status, uri } } }');
     * console.log(JSON.stringify(result, null, 4))
     * //
     * // outputs:
     * // {
     * //   "data": {
     * //     "nodesInfo": {
     * //       "nodes": [{
     * //         "status": "UP",
     * //         "uri": "http://192.168.0.39:4444"
     * //       }]
     * //     }
     * //   }
     * // }
     * //
     * ```
     */
    queryGrid(query: string): Promise<ProtocolCommandResponse>;
}
//# sourceMappingURL=selenium.d.ts.map