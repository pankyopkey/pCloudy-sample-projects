import type { SupportedScopes } from '../../types.js';
/**
 *
 * This command restores specific or all emulated behaviors that were set using the `emulate` command.
 *
 * <example>
    :restore.js
    before(async () => {
        await browser.emulate('geolocation', { latitude: 52.52, longitude: 13.405 })
        await browser.emulate('userAgent', 'foobar')
        await browser.emulate('colorScheme', 'dark')
        await browser.emulate('onLine', false)
    })

    it('should restore all emulated behavior', async () => {
        await browser.url('https://webdriver.io')
        // test within an emulated environment...
    })

    after(async () => {
        // restore all emulated behavior
        await browser.restore()
        // or only restore specific emulated behavior
        // await browser.restore(['geolocation', 'userAgent'])
    })
 * </example>
 *
 * @alias browser.restore
 * @type utility
 *
 */
export declare function restore(this: WebdriverIO.Browser, scopes?: SupportedScopes | SupportedScopes[]): Promise<void>;
//# sourceMappingURL=restore.d.ts.map