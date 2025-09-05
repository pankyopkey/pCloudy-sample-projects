import type { string_file_path } from '../../types/typeAliases';
/**
 * Checks if the file exists
 *
 * Note: `$` is used to indicate that this function is not a pure function - it looks at the filesystem
 *
 * @private within the repository
 */
export declare function $isFileExisting(filePath: string_file_path): Promise<boolean>;
/**
 * Note: [🟢] This code should never be published outside of `@promptbook/node` and `@promptbook/cli` and `@promptbook/cli`
 * TODO: [🐠] This can be a validator - with variants that return true/false and variants that throw errors with meaningless messages
 * TODO: [🖇] What about symlinks?
 */
