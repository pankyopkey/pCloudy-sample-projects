import type { TODO_any } from '../../utils/organization/TODO_any';
import type { FormatDefinition } from '../_common/FormatDefinition';
import type { CsvSettings } from './CsvSettings';
/**
 * Definition for CSV spreadsheet
 *
 * @public exported from `@promptbook/core`
 *                          <- TODO: [🏢] Export from package `@promptbook/csv`
 */
export declare const CsvFormatDefinition: FormatDefinition<string, string, CsvSettings, TODO_any>;
/**
 * TODO: [🍓] In `CsvFormatDefinition` implement simple `isValid`
 * TODO: [🍓] In `CsvFormatDefinition` implement partial `canBeValid`
 * TODO: [🍓] In `CsvFormatDefinition` implement `heal
 * TODO: [🍓] In `CsvFormatDefinition` implement `subvalueDefinitions`
 * TODO: [🏢] Allow to expect something inside CSV objects and other formats
 */
