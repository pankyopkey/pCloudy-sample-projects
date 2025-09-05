/**
 * Trims whitespace from all 4 sides with nested substrings
 *
 * @private withing the repository
 */
export declare function spaceTrimNested(createContent: (block: (blockContent: string) => string) => string): string;
export declare function spaceTrimNested(createContent: (block: (blockContent: string) => string) => Promise<string>): Promise<string>;
