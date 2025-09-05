import { toBeRequestedTimes } from './toBeRequestedTimes.js';
import { DEFAULT_OPTIONS } from '../../constants.js';
export function toBeRequested(received, options = DEFAULT_OPTIONS) {
    return toBeRequestedTimes.call({ ...(this || {}), expectation: 'called' }, received, { gte: 1 }, options);
}
