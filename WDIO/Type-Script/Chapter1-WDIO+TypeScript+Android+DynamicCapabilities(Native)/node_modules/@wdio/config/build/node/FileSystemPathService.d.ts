import type { PathService } from '../types.js';
export default class FileSystemPathService implements PathService {
    #private;
    loadFile<T>(path: string): Promise<T>;
    isFile(filepath: string): boolean;
    /**
     * find test files based on a glob pattern
     * @param pattern file pattern to glob
     * @param rootDir directory of wdio config file
     * @returns files matching the glob pattern
     */
    glob(pattern: string, rootDir: string): string[];
    ensureAbsolutePath(filepath: string, rootDir: string): string;
}
//# sourceMappingURL=FileSystemPathService.d.ts.map