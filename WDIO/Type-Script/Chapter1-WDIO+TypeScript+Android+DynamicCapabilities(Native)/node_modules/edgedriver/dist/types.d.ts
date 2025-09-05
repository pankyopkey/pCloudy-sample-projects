export type LogLevel = 'ALL' | 'DEBUG' | 'INFO' | 'WARNING' | 'SEVERE' | 'OFF';
export interface EdgedriverParameters {
    /**
     * Version of Edgedriver to start. See https://msedgedriver.azureedge.net/ for all available versions, platforms and architecture.
     */
    edgeDriverVersion?: string;
    /**
     * Don't download Edgedriver, instead use a custom path to it, e.g. a cached binary.
     * @default process.env.EDGEDRIVER_PATH
     */
    customEdgeDriverPath?: string;
    /**
     * port to listen on
     */
    port?: number;
    /**
     * adb server port
     */
    adbPort?: number;
    /**
     * write server log to file instead of stderr, increases log level to INFO
     */
    logPath?: string;
    /**
     * set log level
     */
    logLevel?: LogLevel;
    /**
     * log verbosely (equivalent to --log-level=ALL)
     */
    verbose?: boolean;
    /**
     * log nothing (equivalent to --log-level=OFF)
     */
    silent?: boolean;
    /**
     * append log file instead of rewriting
     */
    appendLog?: boolean;
    /**
     * (experimental) log verbosely and don't truncate long strings so that the log can be replayed.
     */
    replayable?: boolean;
    /**
     * base URL path prefix for commands, e.g. wd/url
     */
    baseUrl?: string;
    /**
     * add readable timestamps to log
     */
    readableTimestamp?: boolean;
    /**
     * show logs from the browser (overrides other logging options)
     */
    enableChromeLogs?: boolean;
    /**
     * custom bidi mapper path
     */
    bidiMapperPath?: string;
    /**
     * comma-separated allowlist of remote IP addresses which are allowed to connect to msedgedriver
     */
    allowedIps?: string[];
    /**
     * comma-separated allowlist of request origins which are allowed to connect to msedgedriver. Using `*` to allow any host origin is dangerous!
     */
    allowedOrigins?: string[];
    /**
     * The path to the root of the cache directory.
     * @default process.env.GECKODRIVER_CACHE_DIR || os.tmpdir()
     */
    cacheDir?: string;
}
//# sourceMappingURL=types.d.ts.map