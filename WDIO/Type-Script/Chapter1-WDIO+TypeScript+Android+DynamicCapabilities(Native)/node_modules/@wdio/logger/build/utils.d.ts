export declare const SENSITIVE_DATA_REPLACER = "**MASKED**";
/**
 * Parses a comma-separated string of regular expressions into an array of RegExp objects.
 * Supports both `/pattern/flags` and plain pattern formats.
 *
 * @param {string | undefined} maskingRegexString - The string containing regex patterns.
 * @returns {(RegExp[] | undefined)} Array of RegExp objects or undefined if input is invalid.
 */
export declare const parseMaskingPatterns: (maskingRegexString: string | undefined) => any[] | undefined;
/**
 * Masks sensitive data in a string using the provided masking patterns.
 *
 * - If a pattern has no capturing groups, the whole match is replaced with the mask.
 * - If a pattern has capturing groups, each group is replaced with the mask, preserving the rest of the match.
 *
 * @param {string} text - The text to mask.
 * @param {RegExp[] | undefined} maskingPatterns - Array of RegExp patterns to use for masking.
 * @returns {string} The masked text, or the original value if not a string or if no patterns are provided.
 */
export declare const mask: (text: string, maskingPatterns: RegExp[] | undefined) => string;
//# sourceMappingURL=utils.d.ts.map