import type { string_file_path } from '../../types/typeAliases';
import type { string_folder_path } from '../../types/typeAliases';
/**
 * Reads all files in the directory
 *
 * Note: `$` is used to indicate that this function is not a pure function - it looks at the filesystem
 *
 * @param path
 * @param isRecursive
 * @returns List of all files in the directory
 * @private internal function of `createCollectionFromDirectory`
 */
export declare function $listAllFiles(path: string_folder_path, isRecursive: boolean): Promise<Array<string_file_path>>;
/**
 * Note: [🟢] This code should never be published outside of `@promptbook/node` and `@promptbook/cli` and `@promptbook/cli`
 * TODO: [🖇] What about symlinks?
 */
