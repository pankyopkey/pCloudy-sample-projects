import type { Capabilities } from '@wdio/types';
export interface XvfbOptions {
    /**
     * Explicitly enable / disable Xvfb usage. If false, `shouldRun()` returns false.
     */
    enabled?: boolean;
    /**
     * Force Xvfb to run even on non-Linux systems (for testing)
     */
    force?: boolean;
    /**
     * Override package manager detection (for testing)
     */
    packageManager?: string;
    /**
     * Skip xvfb-run availability check and force installation (for testing)
     */
    forceInstall?: boolean;
    /**
     * Enable automatic installation of `xvfb-run` if missing.
     * @default false
     */
    autoInstall?: boolean;
    /**
     * Mode for automatic installation when autoInstall is true.
     * - 'root': install only if running as root (no sudo)
     * - 'sudo': install if root or via non-interactive sudo (`sudo -n`) if available
     * @default 'sudo'
     */
    autoInstallMode?: 'root' | 'sudo';
    /**
     * Custom command to use for installation instead of built-in package manager detection.
     * When provided, this command is executed as-is and overrides the built-in installation logic.
     */
    autoInstallCommand?: string | string[];
    /**
     * Number of retry attempts for xvfb process failures (default: 3)
     */
    xvfbMaxRetries?: number;
    /**
     * Base delay between retries in milliseconds (default: 1000)
     * Progressive delay will be: baseDelay * attemptNumber
     */
    xvfbRetryDelay?: number;
}
export declare class XvfbManager {
    #private;
    constructor(options?: XvfbOptions);
    /**
     * Check if Xvfb should run on this system
     */
    shouldRun(capabilities?: Capabilities.ResolvedTestrunnerCapabilities): boolean;
    /**
     * Initialize xvfb-run for use
     * @returns Promise<boolean> - true if xvfb-run is ready, false if not needed
     */
    init(capabilities?: Capabilities.ResolvedTestrunnerCapabilities): Promise<boolean>;
    /**
     * Check if the capabilities object is a single capability (not multiremote)
     */
    private isSingleCapability;
    /**
     * Check if the capabilities object is multiremote
     */
    private isMultiRemoteCapability;
    /**
     * Extract capabilities from browser config (handles both nested and direct formats)
     */
    private extractCapabilitiesFromBrowserConfig;
    /**
     * Check a single capability object for headless flags
     */
    private checkCapabilityForHeadless;
    /**
     * Check if browser options contain headless flags
     */
    private hasHeadlessFlag;
    protected detectPackageManager(): Promise<string>;
    /**
     * Execute a command with retry logic for xvfb failures
     */
    executeWithRetry<T>(commandFn: () => Promise<T>, context?: string): Promise<T>;
    /**
     * Check if an error is related to xvfb failures
     */
    private isXvfbError;
}
//# sourceMappingURL=XvfbManager.d.ts.map