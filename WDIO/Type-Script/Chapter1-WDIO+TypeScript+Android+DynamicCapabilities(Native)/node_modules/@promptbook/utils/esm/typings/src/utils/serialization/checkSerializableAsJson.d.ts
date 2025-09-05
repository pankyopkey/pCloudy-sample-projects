import type { string_name } from '../../types/typeAliases';
/**
 * Checks if the value is [🚉] serializable as JSON
 * If not, throws an UnexpectedError with a rich error message and tracking
 *
 * - Almost all primitives are serializable BUT:
 * - `undefined` is not serializable
 * - `NaN` is not serializable
 * - Objects and arrays are serializable if all their properties are serializable
 * - Functions are not serializable
 * - Circular references are not serializable
 * - `Date` objects are not serializable
 * - `Map` and `Set` objects are not serializable
 * - `RegExp` objects are not serializable
 * - `Error` objects are not serializable
 * - `Symbol` objects are not serializable
 * - And much more...
 *
 * @throws UnexpectedError if the value is not serializable as JSON
 * @public exported from `@promptbook/utils`
 */
export declare function checkSerializableAsJson(name: string_name, value: unknown): void;
/**
 * TODO: [🧠][🛣] More elegant way to tracking than passing `name`
 * TODO: [🧠][main] !!! In-memory cache of same values to prevent multiple checks
 * Note: [🐠] This is how `checkSerializableAsJson` + `isSerializableAsJson` together can just retun true/false or rich error message
 */
