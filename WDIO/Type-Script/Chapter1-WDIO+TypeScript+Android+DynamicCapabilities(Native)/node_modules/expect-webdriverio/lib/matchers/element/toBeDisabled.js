import { executeCommandBe } from '../../utils.js';
import { DEFAULT_OPTIONS } from '../../constants.js';
export async function toBeDisabled(received, options = DEFAULT_OPTIONS) {
    this.expectation = this.expectation || 'disabled';
    await options.beforeAssertion?.({
        matcherName: 'toBeDisabled',
        options,
    });
    const result = await executeCommandBe.call(this, received, async (el) => !await el.isEnabled(), options);
    await options.afterAssertion?.({
        matcherName: 'toBeDisabled',
        options,
        result
    });
    return result;
}
