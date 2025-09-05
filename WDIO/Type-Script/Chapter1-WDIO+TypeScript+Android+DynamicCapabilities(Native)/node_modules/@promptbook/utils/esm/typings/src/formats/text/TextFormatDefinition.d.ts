import type { TODO_any } from '../../utils/organization/TODO_any';
import type { FormatDefinition } from '../_common/FormatDefinition';
/**
 * Definition for any text - this will be always valid
 *
 * Note: This is not useful for validation, but for splitting and mapping with `subvalueDefinitions`
 *
 * @public exported from `@promptbook/core`
 */
export declare const TextFormatDefinition: FormatDefinition<string, string, TODO_any, TODO_any>;
/**
 * TODO: [1] Make type for XML Text and Schema
 * TODO: [🧠][🤠] Here should be all words, characters, lines, paragraphs, pages aviable as subvalues
 * TODO: [🍓] In `TextFormatDefinition` implement simple `isValid`
 * TODO: [🍓] In `TextFormatDefinition` implement partial `canBeValid`
 * TODO: [🍓] In `TextFormatDefinition` implement `heal
 * TODO: [🍓] In `TextFormatDefinition` implement `subvalueDefinitions`
 * TODO: [🏢] Allow to expect something inside each item of list and other formats
 */
