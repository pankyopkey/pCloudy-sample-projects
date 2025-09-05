/**
 *
 * The `customs$$` allows you to use a custom strategy declared by using `browser.addLocatorStrategy`.
 * Read more on custom selector strategies in the [Selector docs](../../selectors#custom-selector-strategies).
 *
 * <example>
    :example.js
    it('should get all the plugin wrapper buttons', async () => {
        await browser.url('https://webdriver.io')
        await browser.addLocatorStrategy('myStrategy', (selector) => {
            return document.querySelectorAll(selector)
        })

        const pluginWrapper = await browser.custom$$('myStrategy', '.pluginWrapper')

        console.log(await pluginWrapper.length) // 4
    })
 * </example>
 *
 * @alias custom$$
 * @param {string} strategyName
 * @param {*} strategyArguments
 * @return {WebdriverIO.ElementArray}
 */
export declare function custom$$(this: WebdriverIO.Browser, strategyName: string, ...strategyArguments: unknown[]): Promise<WebdriverIO.ElementArray>;
//# sourceMappingURL=custom$$.d.ts.map