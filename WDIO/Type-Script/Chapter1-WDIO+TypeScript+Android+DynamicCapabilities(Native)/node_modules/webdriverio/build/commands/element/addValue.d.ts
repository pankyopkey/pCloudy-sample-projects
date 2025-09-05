import type { InputOptions } from '../../types.js';
/**
 *
 * Add a value to an input or textarea element found by given selector.
 *
 * :::info
 *
 * If you like to use special characters, e.g. to copy and paste a value from one input to another, use the
 * [`keys`](/docs/api/browser/keys) command.
 *
 * :::
 *
 * <example>
    :addValue.js
    it('should demonstrate the addValue command', async () => {
        let input = await $('.input')
        await input.addValue('test')
        await input.addValue(123)

        value = await input.getValue()
        assert(value === 'test123') // true
    })
 * </example>
 *
 * @alias element.addValue
 * @param {string|number}  value  value to be added
 * @param {InputOptions} additional options, exclusive to Webdriverio
 *
 */
export declare function addValue(this: WebdriverIO.Element, value: string | number, options?: InputOptions): Promise<void>;
//# sourceMappingURL=addValue.d.ts.map