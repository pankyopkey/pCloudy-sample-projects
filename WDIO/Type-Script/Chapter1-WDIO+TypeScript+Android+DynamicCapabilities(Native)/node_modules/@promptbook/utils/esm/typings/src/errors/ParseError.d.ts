/**
 * This error indicates that the promptbook in a markdown format cannot be parsed into a valid promptbook object
 *
 * @public exported from `@promptbook/core`
 */
export declare class ParseError extends Error {
    readonly name = "ParseError";
    constructor(message: string);
}
/**
 * TODO: Maybe split `ParseError` and `ApplyError`
 */
