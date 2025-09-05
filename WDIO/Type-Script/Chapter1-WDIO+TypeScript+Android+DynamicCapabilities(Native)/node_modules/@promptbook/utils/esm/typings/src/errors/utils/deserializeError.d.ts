import type { ErrorJson } from './ErrorJson';
/**
 * Deserializes the error object
 *
 * @public exported from `@promptbook/utils`
 */
export declare function deserializeError(error: ErrorJson): Error;
