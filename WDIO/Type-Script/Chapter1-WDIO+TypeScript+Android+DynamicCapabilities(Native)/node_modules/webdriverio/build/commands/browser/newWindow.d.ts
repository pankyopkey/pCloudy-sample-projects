import type { NewWindowOptions } from '../../types.js';
/**
 *
 * Open new window or tab in browser (defaults to a new window if not specified).
 * This command is the equivalent function to `window.open()`. This command does not work in mobile environments.
 *
 * __Note:__ When calling this command you automatically switch to the new window or tab.
 *
 * <example>
    :newWindowSync.js
    it('should open a new window', async () => {
        await browser.url('https://google.com')
        console.log(await browser.getTitle()) // outputs: "Google"

        const result = await browser.newWindow('https://webdriver.io', {
            windowName: 'WebdriverIO window',
            windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
        })
        console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
        console.log(result.type) // outputs: "window"
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        await browser.closeWindow()
        await browser.switchToWindow(handles[0])
        console.log(await browser.getTitle()) // outputs: "Google"
    });
 * </example>
 * <example>
      :newTabSync.js
      it('should open a new tab', async () => {
          await browser.url('https://google.com')
          console.log(await browser.getTitle()) // outputs: "Google"

          await browser.newWindow('https://webdriver.io', {
              type:'tab',
              windowName: 'WebdriverIO window',
              windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
          })
          console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
          console.log(result.type) // outputs: "tab"
          const handles = await browser.getWindowHandles()
          await browser.switchToWindow(handles[1])
          await browser.closeWindow()
          await browser.switchToWindow(handles[0])
          console.log(await browser.getTitle()) // outputs: "Google"
     });
 * </example>
 *
 * @param {string}  url      website URL to open
 * @param {NewWindowOptions=} options                newWindow command options
 * @param {string=}           options.type           type of new window: 'tab' or 'window'
 * @param {String=}           options.windowName     name of the new window
 * @param {String=}           options.windowFeatures features of opened window (e.g. size, position, scrollbars, etc.)
 *
 * @return {Object}          An object containing the window handle and the type of new window `{handle: string, type: string}` handle - The ID of the window handle of the new tab or window, type - The type of the new window, either 'tab' or 'window'
 *
 * @throws {Error} If `url` is invalid, if the command is used on mobile, or `type` is not 'tab' or 'window'.
 *
 * @uses browser/execute, protocol/getWindowHandles, protocol/switchToWindow
 * @alias browser.newWindow
 * @type window or tab
 */
export declare function newWindow(this: WebdriverIO.Browser, url: string, { type, windowName, windowFeatures }?: NewWindowOptions): Promise<{
    handle: string;
    type: 'tab' | 'window';
}>;
//# sourceMappingURL=newWindow.d.ts.map