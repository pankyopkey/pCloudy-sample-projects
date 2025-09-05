/**
 *
 * Send a sequence of key strokes to the "active" element. You can make an input element active by just clicking
 * on it. To use characters like "Left arrow" or "Back space", import the `Key` object from the WebdriverIO package.
 *
 * Modifier like `Control`, `Shift`, `Alt` and `Command` will stay pressed throughout the sequence and will be released
 * at the end. Modifying a click requires you to use the WebDriver Actions API through the
 * [performActions](https://webdriver.io/docs/api/webdriver#performactions) method.
 *
 * :::info
 *
 * Control keys differ based on the operating system the browser is running on, e.g. MacOS: `Command` and Windows: `Control`.
 * WebdriverIO provides a cross browser modifier control key called `Ctrl` (see example below).
 *
 * :::
 *
 * @param {String|String[]} value  The sequence of keys to type. An array or string must be provided.
 * @see https://w3c.github.io/webdriver/#dispatching-actions
 * @example https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
 *
 */
export declare function keys(this: WebdriverIO.Browser, value: string | string[]): Promise<void>;
//# sourceMappingURL=keys.d.ts.map