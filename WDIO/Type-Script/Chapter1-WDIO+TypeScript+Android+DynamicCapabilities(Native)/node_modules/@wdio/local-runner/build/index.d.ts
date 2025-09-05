import { WritableStreamBuffer } from 'stream-buffers';
import type { Workers } from '@wdio/types';
import WorkerInstance from './worker.js';
export type { WorkerInstance };
export interface RunArgs extends Workers.WorkerRunPayload {
    command: string;
    args: Workers.WorkerMessageArgs;
    cid: string;
}
export default class LocalRunner {
    private _options;
    protected config: WebdriverIO.Config;
    workerPool: Record<string, WorkerInstance>;
    private xvfbInitialized;
    private xvfbManager;
    stdout: WritableStreamBuffer;
    stderr: WritableStreamBuffer;
    constructor(_options: never, config: WebdriverIO.Config);
    /**
     * initialize local runner environment
     */
    initialize(): Promise<void>;
    getWorkerCount(): number;
    run({ command, args, ...workerOptions }: RunArgs): Promise<WorkerInstance>;
    /**
     * Initialize XVFB with capability-aware detection
     */
    private initializeXvfb;
    /**
     * shutdown all worker processes
     *
     * @return {Promise}  resolves when all worker have been shutdown or
     *                    a timeout was reached
     */
    shutdown(): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map