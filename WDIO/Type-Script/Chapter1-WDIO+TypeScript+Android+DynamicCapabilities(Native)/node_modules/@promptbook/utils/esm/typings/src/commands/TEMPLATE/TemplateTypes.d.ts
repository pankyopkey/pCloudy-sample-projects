import type { TupleToUnion } from 'type-fest';
/**
 * Template type describes the way how the template is templated
 *
 * @see https://github.com/webgptorg/promptbook#template-type
 * @public exported from `@promptbook/core`
 */
export type TemplateType = TupleToUnion<typeof TemplateTypes>;
/**
 * Template type describes the way how the template is templated
 *
 * @see https://github.com/webgptorg/promptbook#template-type
 * @public exported from `@promptbook/core`
 */
export declare const TemplateTypes: readonly ["PROMPT_TEMPLATE", "SIMPLE_TEMPLATE", "SCRIPT_TEMPLATE", "DIALOG_TEMPLATE", "SAMPLE", "KNOWLEDGE", "INSTRUMENT", "ACTION"];
