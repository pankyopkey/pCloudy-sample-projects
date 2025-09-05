/**
 *
 * An element is considered to be clickable when the following conditions are met:
 *
 * - the element exists
 * - the element is displayed
 * - the element is not disabled
 * - the element is within the viewport
 * - the element can be scrolled into the viewport
 * - the element's center is not overlapped with another element
 *
 * otherwise return false.
 *
 * :::info
 *
 * Please note that `isClickable` works only in web browser and in mobile webviews,
 * it doesn't work in mobile app native context. Also, As opposed to other element
 * commands WebdriverIO will not wait for the element to exist to execute this command.
 *
 * :::
 *
 * <example>
    :isClickable.js
    it('should detect if an element is clickable', async () => {
        const el = await $('#el')
        let clickable = await el.isClickable();
        console.log(clickable); // outputs: true or false

        // wait for element to be clickable
        await browser.waitUntil(() => el.isClickable())
    });
 * </example>
 *
 * @alias element.isClickable
 * @return {Boolean}            true if element is clickable
 * @uses protocol/selectorExecute, protocol/timeoutsAsyncScript
 * @type state
 *
 */
export declare function isClickable(this: WebdriverIO.Element): Promise<boolean>;
//# sourceMappingURL=isClickable.d.ts.map