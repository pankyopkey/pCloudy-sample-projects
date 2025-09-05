import { toHaveElementProperty } from './toHaveElementProperty.js';
import { DEFAULT_OPTIONS } from '../../constants.js';
export function toHaveValue(el, value, options = DEFAULT_OPTIONS) {
    return toHaveElementProperty.call(this, el, 'value', value, options);
}
