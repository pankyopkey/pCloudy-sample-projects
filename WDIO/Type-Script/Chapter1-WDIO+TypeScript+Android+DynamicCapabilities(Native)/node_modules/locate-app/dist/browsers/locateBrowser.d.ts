/**
 *
 * @param browser It can be "default", "chrome", "firefox", "safari", "ie", "msie", "edge" or "msedge" or executable path to the browser
 * @returns executable path to browser
 */
export declare function locateBrowser(browser: string): Promise<string>;
