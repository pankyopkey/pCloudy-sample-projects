export interface SetViewportOptions {
    width: number;
    height: number;
    devicePixelRatio?: number;
}
/**
 * Resizes the browser viewport within the browser. As oppose to `setWindowSize`,
 * this command changes the viewport size, not the window size.
 *
 * <example>
 * :setWindowSize.js
    it('should set viewport to emulate iPhone 15', async () => {
        await browser.setWindowSize({
            width: 393,
            height: 659,
            deviceScaleFactor: 3
        });
    });
 * </example>
 *
 * @alias browser.setWindowSize
 * @param {SetViewportOptions} options                  command arguments
 * @param {number}             options.width            viewport width in pixels
 * @param {number}             options.height           viewport height in pixels
 * @param {number}             options.devicePixelRatio pixel ratio of the viewport
 * @return {`Promise<void>`}
 * @type window
 */
export declare function setViewport(this: WebdriverIO.Browser, options: SetViewportOptions): Promise<void>;
//# sourceMappingURL=setViewport.d.ts.map