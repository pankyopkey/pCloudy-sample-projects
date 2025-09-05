/**
 *
 * Save a screenshot of an element to a PNG file on your OS.
 *
 * <example>
    :saveScreenshot.js
    it('should save a screenshot of the browser view', async () => {
        const elem = await $('#someElem');
        await elem.saveScreenshot('./some/path/elemScreenshot.png');
    });
 * </example>
 *
 * @alias element.saveScreenshot
 * @param   {String}  filename  path to the generated image (`.png` suffix is required) relative to the execution directory
 * @return  {Buffer}            screenshot buffer
 * @type utility
 *
 */
export declare function saveElementScreenshot(this: WebdriverIO.Element, filepath: string): Promise<Buffer<ArrayBuffer>>;
//# sourceMappingURL=saveElementScreenshot.d.ts.map