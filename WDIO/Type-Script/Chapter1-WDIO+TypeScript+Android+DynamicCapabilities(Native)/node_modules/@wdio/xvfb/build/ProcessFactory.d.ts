import type { ChildProcess } from 'node:child_process';
import { XvfbManager } from './XvfbManager.js';
export interface ProcessCreator {
    createWorkerProcess(scriptPath: string, args: string[], options: ProcessCreationOptions): Promise<ChildProcess>;
}
export interface ProcessCreationOptions {
    cwd?: string;
    env?: Record<string, string>;
    execArgv?: string[];
    stdio?: ('inherit' | 'pipe' | 'ignore' | 'ipc')[];
}
export declare class ProcessFactory implements ProcessCreator {
    #private;
    constructor(xvfbManager?: XvfbManager);
    createWorkerProcess(scriptPath: string, args: string[], options: ProcessCreationOptions): Promise<ChildProcess>;
}
//# sourceMappingURL=ProcessFactory.d.ts.map