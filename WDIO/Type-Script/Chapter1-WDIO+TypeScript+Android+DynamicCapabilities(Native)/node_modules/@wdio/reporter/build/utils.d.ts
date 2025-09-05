import { COLORS } from './constants.js';
/**
 * replaces whitespaces with underscore and removes dots
 * @param  {string} str  variable to sanitize
 * @return {String}      sanitized variable
 */
export declare function sanitizeString(str?: string): string;
/**
 * formats capability object into sanitized string for e.g.filenames
 * @param {object} caps  Selenium capabilities
 */
export declare function sanitizeCaps(caps?: WebdriverIO.Capabilities): string;
/**
 * Takes a event emitted by a framework and extracts
 * an array of errors representing test or hook failures.
 * This exists to maintain compatibility between frameworks
 * with have a soft assertion model (Jasmine) and those that
 * have a hard assertion model (Mocha)
 * @param {*} e  An event emitted by a framework adapter
 */
export declare function getErrorsFromEvent(e: {
    errors?: Error[];
    error?: Error;
}): Error[];
/**
 * Pads the given `str` to `len`.
 *
 * @private
 * @param {string} str
 * @param {number} len
 * @return {string}
 */
export declare function pad(str: string, len: number): string;
export declare function color(type: keyof typeof COLORS, content: string): string;
/**
 * Colors lines for `str`, using the color `name`.
 *
 * @private
 * @param {string} name
 * @param {string} str
 * @return {string}
 */
export declare function colorLines(name: keyof typeof COLORS, str: string): string;
/**
 * Transforms WebDriver execute command scripts to avoid accumulating
 * long scripts in the default TestStats.
 * @param script WebDriver command script
 */
export declare function transformCommandScript(script?: string | Function): string | undefined;
//# sourceMappingURL=utils.d.ts.map