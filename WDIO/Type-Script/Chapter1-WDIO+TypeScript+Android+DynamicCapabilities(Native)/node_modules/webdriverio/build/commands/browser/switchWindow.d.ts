/**
 *
 * Switch focus to a particular tab / window.
 *
 * <example>
    :switchWindow.js
    it('should switch to another window', async () => {
        // open url
        await browser.url('https://google.com')

        // get window handle
        const handle = await browser.getWindowHandle()

        // create new window
        await browser.newWindow('https://webdriver.io')

        // switch back via url match
        await browser.switchWindow('google.com')

        // switch back via title match
        await browser.switchWindow('Next-gen browser and mobile automation test framework for Node.js')

        // switch back via window handle
        await browser.switchWindow(handle)
    });
 * </example>
 *
 * @param {String|RegExp}  matcher  String or regular expression that matches either the page title or URL, the window name, or the window handle
 *
 * @uses protocol/getWindowHandles, protocol/switchToWindow, protocol/getUrl, protocol/getTitle
 * @alias browser.switchTab
 * @type window
 *
 */
export declare function switchWindow(this: WebdriverIO.Browser, matcher: string | RegExp): Promise<string>;
//# sourceMappingURL=switchWindow.d.ts.map