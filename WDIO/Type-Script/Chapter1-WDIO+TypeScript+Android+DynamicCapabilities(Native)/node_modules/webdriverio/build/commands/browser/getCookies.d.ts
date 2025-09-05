import type { Cookie } from '@wdio/protocols';
import type { remote } from 'webdriver';
/**
 *
 * Retrieve a [cookie](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)
 * visible to the current page. You can query a specific cookie by providing the cookie name or
 * retrieve all.
 *
 * <example>
    :getCookies.js
    it('should return a cookie for me', async () => {
        await browser.setCookies([
            {name: 'test', value: '123'},
            {name: 'test2', value: '456'}
        ])
        const testCookie = await browser.getCookies(['test'])
        console.log(testCookie); // outputs: [{ name: 'test', value: '123' }]

        const allCookies = await browser.getCookies()
        console.log(allCookies);
        // outputs:
        // [
        //    { name: 'test', value: '123' },
        //    { name: 'test2', value: '456' }
        // ]

        // filter cookies by domain
        const stagingCookies = await browser.getCookies({
            domain: 'staging.myapplication.com'
        })
    })
 * </example>
 *
 * @alias browser.getCookies
 * @param {remote.StorageCookieFilter}  filter  an object that allows to filter for cookies with specific attributes
 * @return {Cookie[]}                           requested cookies
 *
 */
export declare function getCookies(this: WebdriverIO.Browser, filter?: string | string[] | remote.StorageCookieFilter): Promise<Cookie[]>;
//# sourceMappingURL=getCookies.d.ts.map