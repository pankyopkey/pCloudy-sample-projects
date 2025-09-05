import type { ReadonlyDeep } from 'type-fest';
/**
 * @@@
 *
 * Note: `$` is used to indicate that this function is not a pure function - it mutates given object
 * Note: This function mutates the object and returns the original (but mutated-deep-freezed) object
 *
 * @returns The same object as the input, but deeply frozen
 * @public exported from `@promptbook/utils`
 */
export declare function $deepFreeze<TObject>(objectValue: TObject): ReadonlyDeep<TObject>;
/**
 * TODO: [🧠] Is there a way how to meaningfully test this utility
 */
