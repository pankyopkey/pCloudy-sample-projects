import type { ModuleImportService } from '../types.js';
export default class RequireLibrary implements ModuleImportService {
    import<T>(module: string): Promise<T>;
}
//# sourceMappingURL=RequireLibrary.d.ts.map