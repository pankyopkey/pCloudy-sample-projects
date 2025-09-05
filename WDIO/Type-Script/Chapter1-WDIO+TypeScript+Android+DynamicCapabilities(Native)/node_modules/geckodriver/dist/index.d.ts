import { type ChildProcess } from 'node:child_process';
import { download as downloadDriver } from './install.js';
import type { GeckodriverParameters } from './types.js';
export declare function start(params: GeckodriverParameters): Promise<ChildProcess>;
export declare const download: typeof downloadDriver;
export * from './types.js';
//# sourceMappingURL=index.d.ts.map