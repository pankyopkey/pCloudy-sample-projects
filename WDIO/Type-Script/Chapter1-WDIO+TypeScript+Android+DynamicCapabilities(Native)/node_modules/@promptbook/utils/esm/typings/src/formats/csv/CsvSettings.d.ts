import type { ParseConfig, UnparseConfig } from 'papaparse';
/**
 * @@@
 */
export type CsvSettings = Pick<ParseConfig & UnparseConfig, 'delimiter' | 'quoteChar' | 'newline' | 'skipEmptyLines'>;
/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export declare const MANDATORY_CSV_SETTINGS: Readonly<{
    readonly header: true;
}>;
