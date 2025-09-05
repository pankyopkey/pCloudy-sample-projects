import type { PACKAGE_MANAGER } from './constants.js';
export declare function installPackages(cwd: string, packages: string[], dev: boolean): Promise<boolean>;
export declare function getInstallCommand(pm: PACKAGE_MANAGER, packages: string[], dev: boolean): string;
//# sourceMappingURL=install.d.ts.map