import type { EdgedriverParameters } from 'edgedriver';
import type { Options } from '@wdio/types';
/**
 * Helper utility to check file access
 * @param {string} file file to check access for
 * @return              true if file can be accessed
 */
export declare const canAccess: (file?: string) => boolean;
export declare function parseParams(params: EdgedriverParameters): string[];
export declare function getBuildIdByChromePath(chromePath?: string): string | undefined;
export declare function getBuildIdByFirefoxPath(firefoxPath?: string): Promise<string | undefined>;
export declare const downloadProgressCallback: (artifact: string, downloadedBytes: number, totalBytes: number) => void;
export declare function setupPuppeteerBrowser(cacheDir: string, caps: WebdriverIO.Capabilities): Promise<{
    executablePath: string;
    browserVersion: string | undefined;
} | {
    executablePath: string | undefined;
    browserVersion: string;
}>;
export declare function getDriverOptions(caps: WebdriverIO.Capabilities): WebdriverIO.ChromedriverOptions | WebdriverIO.GeckodriverOptions | WebdriverIO.EdgedriverOptions;
export declare function getCacheDir(options: Pick<Options.WebDriver, 'cacheDir'>, caps: WebdriverIO.Capabilities): string;
export declare function getMajorVersionFromString(fullVersion: string): string;
export declare function setupChromedriver(cacheDir: string, driverVersion?: string): Promise<{
    executablePath: string;
}>;
export declare function setupGeckodriver(cacheDir: string, driverVersion?: string): Promise<string>;
export declare function setupEdgedriver(cacheDir: string, driverVersion?: string): Promise<string>;
export declare function generateDefaultPrefs(caps: WebdriverIO.Capabilities): {
    prefs?: undefined;
} | {
    prefs: {
        'profile.password_manager_leak_detection': boolean;
    };
};
//# sourceMappingURL=utils.d.ts.map