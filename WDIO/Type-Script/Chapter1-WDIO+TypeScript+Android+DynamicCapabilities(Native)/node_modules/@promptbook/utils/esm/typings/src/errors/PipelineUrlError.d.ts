/**
 * This error indicates errors in referencing promptbooks between each other
 *
 * @public exported from `@promptbook/core`
 */
export declare class PipelineUrlError extends Error {
    readonly name = "PipelineUrlError";
    constructor(message: string);
}
