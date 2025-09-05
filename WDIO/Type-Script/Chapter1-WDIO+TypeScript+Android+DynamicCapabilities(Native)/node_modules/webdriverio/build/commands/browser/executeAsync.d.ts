import type { TransformElement } from '../../types.js';
/**
 * :::warning
 * The `executeAsync` command is deprecated and will be removed in a future version.
 * Please use the `execute` command instead as it provides better support for
 * error handling via `async`/`await`.
 * :::
 *
 * Inject a snippet of JavaScript into the page for execution in the context of the currently selected
 * frame. The executed script is assumed to be asynchronous and must signal that is done by invoking
 * the provided callback, which is always provided as the final argument to the function. The value
 * to this callback will be returned to the client.
 *
 * Asynchronous script commands may not span page loads. If an unload event is fired while waiting
 * for a script result, an error should be returned to the client.
 *
 * The script argument defines the script to execute in the form of a function body. The function will
 * be invoked with the provided args array and the values may be accessed via the arguments object
 * in the order specified. The final argument will always be a callback function that must be invoked
 * to signal that the script has finished.
 *
 * Arguments may be any JSON-primitive, array, or JSON object. JSON objects that define a WebElement
 * reference will be converted to the corresponding DOM element. Likewise, any WebElements in the script
 * result will be returned to the client as WebElement JSON objects.
 *
 * <example>
    :executeAsync.js
    it('should execute async JavaScript on the page', async () => {
        await browser.setTimeout({ script: 5000 })
        const result = await browser.executeAsync(function(a, b, c, d, done) {
            // browser context - you may not access client or console
            setTimeout(() => {
                done(a + b + c + d)
            }, 3000);
        }, 1, 2, 3, 4)
        // node.js context - client and console are available
        console.log(result) // outputs: 10
    });

    :executeAsync.ts
    // explicitly type the return value of the script to ensure type safety
    const result: number = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
 * </example>
 *
 * @param {String|Function} script     The script to execute.
 * @param {*=}               arguments  script arguments
 *
 * @return {*}             The script result.
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-execute-async-script
 * @type protocol
 * @deprecated Please use `execute` instead
 */
export declare function executeAsync<ReturnValue, InnerArguments extends unknown[]>(this: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser, script: string | ((...args: [
    ...innerArgs: {
        [K in keyof InnerArguments]: TransformElement<InnerArguments[K]>;
    },
    callback: (result?: TransformElement<ReturnValue>) => void
]) => void), ...args: InnerArguments): Promise<ReturnValue>;
//# sourceMappingURL=executeAsync.d.ts.map