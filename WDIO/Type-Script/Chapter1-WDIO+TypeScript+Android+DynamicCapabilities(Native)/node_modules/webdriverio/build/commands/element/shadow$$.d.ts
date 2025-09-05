/**
 *
 * Access elements inside a given element's shadowRoot. If you are working
 * with lots of nested shadow roots, an alternative approach to `shadow$$`
 * is to use the [deep selector](https://webdriver.io/docs/selectors#deep-selectors).
 *
 * :::info
 *
 * WebdriverIO automatically pierces through shadow roots when using `$` or `$$` commands.
 * This command is only needed if you automate within an environment that doesn't
 * support WebDriver Bidi yet, e.g. mobile web testing with Appium.
 *
 * :::
 *
 * <example>
    :shadow$$.js
    it('should return elements inside a shadowRoot', async () => {
        const innerEl = await $('.input').shadow$$('#innerEl');
        console.log(await innerEl.getValue()); // outputs: 'test123'
    });
 * </example>
 *
 * @alias element.shadow$$
 * @param {String|Function} selector  selector or JS Function to fetch a certain element
 * @return {WebdriverIO.ElementArray}
 * @type utility
 *
 */
export declare function shadow$$(this: WebdriverIO.Element, selector: string): Promise<import("../../types.js").ChainablePromiseArray | WebdriverIO.ElementArray>;
//# sourceMappingURL=shadow$$.d.ts.map