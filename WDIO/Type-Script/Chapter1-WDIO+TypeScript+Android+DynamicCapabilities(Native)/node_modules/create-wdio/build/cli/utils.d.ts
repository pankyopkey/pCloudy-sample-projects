import type { ParsedAnswers } from '../types.js';
export declare function runConfigCommand(parsedAnswers: ParsedAnswers, npmTag: string): Promise<void>;
/**
 * Helper utility used in `run` and `install` command to create config if none exist
 * @param {string} command to be executed by user
 * @param {string} configPath the path to a wdio.conf.[js/ts] file
 * @param {Function} runConfigCmd runConfig method to be replaceable for unit testing
 */
export declare function missingConfigurationPrompt(command: string, configPath: string, runConfigCmd?: Function): Promise<string>;
export declare const parseAnswers: (yes: boolean) => Promise<ParsedAnswers>;
/**
 * Helper utility used in `run` and `install` command to check whether a config file currently exists
 * @param configPathNoExtension the file path to the WDIO config file without extension
 * @param configPath the file path to the WDIO config file that is checked first if set
 * @returns {string} the path to the config file that exists, otherwise undefined
 */
export declare function canAccessConfigPath(configPathNoExtension: string, configPath?: string): Promise<string | undefined>;
//# sourceMappingURL=utils.d.ts.map