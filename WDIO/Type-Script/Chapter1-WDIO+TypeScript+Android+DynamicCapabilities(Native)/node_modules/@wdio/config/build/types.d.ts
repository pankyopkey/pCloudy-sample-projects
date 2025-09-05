export interface PathService {
    loadFile<T>(path: string): Promise<T>;
    isFile(path: string): boolean;
    ensureAbsolutePath(path: string, rootDir: string): string;
    glob(pattern: string, rootDir: string): string[];
}
export interface ModuleImportService {
    import<T>(module: string): Promise<T>;
}
//# sourceMappingURL=types.d.ts.map