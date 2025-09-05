/**
 *
 * The `custom$` allows you to use a custom strategy declared by using `browser.addLocatorStrategy`.
 * Read more on custom selector stratgies in the [Selector docs](../../selectors#custom-selector-strategies).
 *
 * <example>
    :example.js
    it('should fetch the project title', async () => {
        await browser.url('https://webdriver.io')
        browser.addLocatorStrategy('myStrat', (selector) => {
            return document.querySelectorAll(selector)
        })

        const projectTitle = await browser.custom$('myStrat', '.projectTitle')

        console.log(await projectTitle.getText()) // WEBDRIVER I/O
    })
 * </example>
 *
 * @alias custom$
 * @param {string} strategyName
 * @param {*} strategyArguments
 * @example https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
 * @example https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
 * @example https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
 * @return {WebdriverIO.Element}
 */
export declare function custom$(this: WebdriverIO.Browser, strategyName: string, ...strategyArguments: unknown[]): Promise<WebdriverIO.Element>;
//# sourceMappingURL=custom$.d.ts.map