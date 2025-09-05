/**
 * Trims string from all 4 sides
 *
 * @see https://github.com/hejny/spacetrim#usage
 */
export declare function spaceTrim(content: string): string;
export declare function spaceTrim(createContent: (block: (blockContent: string) => string) => string): string;
export declare function spaceTrim(createContent: (block: (blockContent: string) => string) => Promise<string>): Promise<string>;
/**
 *  TODO: Allow to change split char , char: RegExp = /\s/
 */
