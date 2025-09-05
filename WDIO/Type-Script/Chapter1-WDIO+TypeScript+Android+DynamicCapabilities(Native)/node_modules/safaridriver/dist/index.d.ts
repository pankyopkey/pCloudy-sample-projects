import cp from 'node:child_process';
export declare const DEFAULT_PATH = "/usr/bin/safaridriver";
export declare const DEFAULT_STP_PATH = "/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver";
export declare const DEFAULT_PORT = 4444;
export interface SafaridriverOptions {
    /**
     * Specifies the port on which the HTTP server should listen for incoming connections.
     * If the port is already in use or otherwise unavailable, Safaridriver will exit
     * immediately with a non-zero return code.
     * @default 4444
     */
    port?: number;
    /**
     * Path to Safaridriver binary.
     * @default /usr/bin/safaridriver
     */
    path?: string;
    /**
     * Applies configuration changes so that subsequent WebDriver sessions will run without
     * further authentication. This includes checking "Enable Remote Automation" in Safari's
     * `Develop` menu. The user must authenticate via password for the changes to be applied.
     *
     * When this option is specified, safaridriver exits immediately without starting up the
     * REST API service. If the changes were successful or already applied, safaridriver exits 0;
     * otherwise, safaridriver exits >0 and prints an error message to stderr.
     * @default false
     */
    enable?: boolean;
    /**
     * Enables diagnostic logging for all sessions hosted by this safaridriver instance.
     * @default false
     */
    diagnose?: boolean;
    /**
     * If enabled, it starts the Safaridriver binary from the Safari Technology Preview app.
     */
    useTechnologyPreview?: boolean;
}
export declare const start: (options?: SafaridriverOptions) => cp.ChildProcess;
export declare const stop: () => void;
declare const _default: {
    start: (options?: SafaridriverOptions) => cp.ChildProcess;
    stop: () => void;
};
export default _default;
//# sourceMappingURL=index.d.ts.map