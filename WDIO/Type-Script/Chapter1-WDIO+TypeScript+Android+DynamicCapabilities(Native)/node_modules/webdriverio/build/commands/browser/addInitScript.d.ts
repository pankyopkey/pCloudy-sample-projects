/**
 * Adds a script which would be evaluated in one of the following scenarios:
 *
 * - Whenever the page is navigated.
 * - Whenever the child frame is attached or navigated. In this case, the script is evaluated in
 *   the context of the newly attached frame.
 *
 * The script is evaluated after the document was created but before any of its scripts were run.
 * In order to remove the initialization script from the page again, call the function that got
 * returned by this function.
 *
 * This is useful to amend the JavaScript environment, e.g. to seed Math.random.
 *
 * <example>
    :addInitScript.js
    const script = await browser.addInitScript((seed) => {
        Math.random = () => seed
    }, 42)

    await browser.url('https://webdriver.io')
    console.log(await browser.execute(() => Math.random())) // returns 42

    await reset()
    await browser.url('https://webdriver.io')
    console.log(await browser.execute(() => Math.random())) // returns a random number
 * </example>
 *
 * Furthermore you can also use the `emit` function to send data back to the Node.js environment.
 * This is useful if you want to observe certain events in the browser environment, e.g.:
 *
 * <example>
    :addInitScriptWithEmit.js
    const script = await browser.addInitScript((emit) => {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          emit(mutation.target.nodeName)
        }
      })
      observer.observe(document, { childList: true, subtree: true })
    })

    script.on('data', (data) => {
      console.log(data) // prints: BODY, DIV, P, ...
    })
 * </example>
 *
 * @alias browser.addInitScript
 * @param {Function}              script  function to be injected as initialization script
 * @param {number|string|boolean} args    parameters for the script
 * @type utility
 *
 */
export declare function addInitScript<Payload>(this: WebdriverIO.Browser, script: string | InitScriptFunction<Payload>): Promise<InitScript<Payload>>;
export declare function addInitScript<Payload, Arg1>(this: WebdriverIO.Browser, script: string | InitScriptFunctionArg1<Payload, Arg1>, arg1: Arg1): Promise<InitScript<Payload>>;
export declare function addInitScript<Payload, Arg1, Arg2>(this: WebdriverIO.Browser, script: string | InitScriptFunctionArg2<Payload, Arg1, Arg2>, arg1: Arg1, arg2: Arg2): Promise<InitScript<Payload>>;
export declare function addInitScript<Payload, Arg1, Arg2, Arg3>(this: WebdriverIO.Browser, script: string | InitScriptFunctionArg3<Payload, Arg1, Arg2, Arg3>, arg1: Arg1, arg2: Arg2, arg3: Arg3): Promise<InitScript<Payload>>;
export declare function addInitScript<Payload, Arg1, Arg2, Arg3, Arg4>(this: WebdriverIO.Browser, script: string | InitScriptFunctionArg4<Payload, Arg1, Arg2, Arg3, Arg4>, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4): Promise<InitScript<Payload>>;
export declare function addInitScript<Payload, Arg1, Arg2, Arg3, Arg4, Arg5>(this: WebdriverIO.Browser, script: string | InitScriptFunctionArg5<Payload, Arg1, Arg2, Arg3, Arg4, Arg5>, arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5): Promise<InitScript<Payload>>;
/**
 * Callback to emit data from the browser back to the Node.js environment. In order to receive the
 * data returned by the callback function you have to listen to the `data` event, e.g.
 *
 * ```js
 * const script = await browser.addInitScript((emit) => {
 *    emit('hello')
 * })
 * script.on('data', (data) => {
 *   console.log(data) // prints: hello
 * })
 * ```
 *
 * @param {any} data  The data to emit.
 */
type InitScriptCallback<Payload> = (data: Payload) => void;
type InitScriptFunction<Payload> = ((emit: InitScriptCallback<Payload>) => void | Promise<void>);
type InitScriptFunctionArg1<Payload, Arg1> = ((arg1: Arg1, emit: InitScriptCallback<Payload>) => void | Promise<void>);
type InitScriptFunctionArg2<Payload, Arg1, Arg2> = ((arg1: Arg1, arg2: Arg2, emit: InitScriptCallback<Payload>) => void | Promise<void>);
type InitScriptFunctionArg3<Payload, Arg1, Arg2, Arg3> = ((arg1: Arg1, arg2: Arg2, arg3: Arg3, emit: InitScriptCallback<Payload>) => void | Promise<void>);
type InitScriptFunctionArg4<Payload, Arg1, Arg2, Arg3, Arg4> = ((arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, emit: InitScriptCallback<Payload>) => void | Promise<void>);
type InitScriptFunctionArg5<Payload, Arg1, Arg2, Arg3, Arg4, Arg5> = ((arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, emit: InitScriptCallback<Payload>) => void | Promise<void>);
export interface InitScript<Payload = undefined> {
    remove: () => Promise<void>;
    on: (event: 'data', listener: (data: Payload) => void) => void;
}
export {};
//# sourceMappingURL=addInitScript.d.ts.map