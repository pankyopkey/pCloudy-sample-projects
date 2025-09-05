import type { SaveScreenshotOptions } from '../types.js';
/**
 *
 * Save a screenshot of the current browsing context to a PNG file on your OS. Be aware that
 * some browser drivers take screenshots of the whole document (e.g. Geckodriver with Firefox)
 * and others only of the current viewport (e.g. Chromedriver with Chrome).
 *
 * <example>
    :saveScreenshot.js
    it('should save a screenshot of the browser view', async () => {
        await browser.saveScreenshot('./some/path/screenshot.png');
    });
 * </example>
 *
 * When running from a hook, make sure to explicitly define the hook as async:
 * <example>
    :wdio.conf.js
    afterTest: async function(test) {
        await browser.saveScreenshot('./some/path/screenshot.png');
    }
 * </example>
 * @alias browser.saveScreenshot
 * @param   {String}  filepath  path to the generated image (`.png` suffix is required) relative to the execution directory
 * @return  {Buffer}            screenshot buffer
 * @type utility
 *
 */
export declare function saveScreenshot(this: WebdriverIO.Browser, filepath: string, options?: SaveScreenshotOptions): Promise<Buffer<ArrayBuffer>>;
/**
 * take screenshot using legacy WebDriver command
 * @returns {string} a base64 encoded screenshot
 */
export declare function takeScreenshotClassic(this: WebdriverIO.Browser, filepath: string, options?: SaveScreenshotOptions): Promise<string>;
/**
 * takeScreenshotBidi
 * @returns {string} a base64 encoded screenshot
 */
export declare function takeScreenshotBidi(this: WebdriverIO.Browser, filepath: string, options?: SaveScreenshotOptions): Promise<string>;
//# sourceMappingURL=saveScreenshot.d.ts.map