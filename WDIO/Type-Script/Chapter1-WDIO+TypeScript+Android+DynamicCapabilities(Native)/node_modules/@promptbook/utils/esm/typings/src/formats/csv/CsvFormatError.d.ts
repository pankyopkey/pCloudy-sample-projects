import { AbstractFormatError } from "../../errors/AbstractFormatError";
/**
 * This error indicates problem with parsing of CSV
 *
 * @public exported from `@promptbook/core`
 */
export declare class CsvFormatError extends AbstractFormatError {
    readonly name = "CsvFormatError";
    constructor(message: string);
}
