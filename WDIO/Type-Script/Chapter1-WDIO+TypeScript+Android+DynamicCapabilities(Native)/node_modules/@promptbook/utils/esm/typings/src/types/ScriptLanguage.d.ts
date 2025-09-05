import type { TupleToUnion } from 'type-fest';
/**
 * Script language
 *
 * Note: [🚉] This is fully serializable as JSON
 */
export type ScriptLanguage = TupleToUnion<typeof SUPPORTED_SCRIPT_LANGUAGES>;
/**
 * Supported script languages
 *
 * @private internal base for `ScriptLanguage`
 */
export declare const SUPPORTED_SCRIPT_LANGUAGES: readonly ["javascript", "typescript", "python"];
