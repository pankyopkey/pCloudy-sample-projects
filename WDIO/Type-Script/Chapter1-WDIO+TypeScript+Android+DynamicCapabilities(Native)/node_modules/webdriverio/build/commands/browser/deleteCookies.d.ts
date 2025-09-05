import type { remote } from 'webdriver';
/**
 * Delete cookies visible to the current page. By providing a cookie name it
 * just removes the single cookie or more when multiple names are passed.
 *
 * @alias browser.deleteCookies
 * @param {StorageCookieFilter[]} filter  Use the filter property to identify and delete specific cookies based on matching criteria.
 * @example https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
 * @example https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
 */
export declare function deleteCookies(this: WebdriverIO.Browser, filter?: string | string[] | remote.StorageCookieFilter | remote.StorageCookieFilter[]): Promise<void>;
//# sourceMappingURL=deleteCookies.d.ts.map