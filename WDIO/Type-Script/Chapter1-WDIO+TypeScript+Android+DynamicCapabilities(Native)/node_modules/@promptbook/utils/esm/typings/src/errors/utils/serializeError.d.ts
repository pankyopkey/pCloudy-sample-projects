import type { ErrorJson } from './ErrorJson';
/**
 * Serializes an error into a [🚉] JSON-serializable object
 *
 * @public exported from `@promptbook/utils`
 */
export declare function serializeError(error: Error): ErrorJson;
