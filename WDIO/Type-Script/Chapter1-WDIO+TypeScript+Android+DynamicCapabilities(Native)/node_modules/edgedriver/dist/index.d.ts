import cp from 'node:child_process';
import { download as downloadDriver } from './install.js';
import type { EdgedriverParameters } from './types.js';
export declare function start(params: EdgedriverParameters): Promise<cp.ChildProcessWithoutNullStreams>;
export declare const download: typeof downloadDriver;
export declare const findEdgePath: () => string;
export * from './types.js';
//# sourceMappingURL=index.d.ts.map