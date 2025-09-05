import type { ChildProcess } from 'node:child_process';
import type { ReplConfig } from '@wdio/repl';
import WDIORepl from './repl.js';
/**
 * repl queue class
 * allows to run debug commands in mutliple workers one after another
 */
export default class ReplQueue {
    private _repls;
    runningRepl?: WDIORepl;
    add(childProcess: ChildProcess, options: ReplConfig, onStart: Function, onEnd: Function): void;
    next(): void;
    get isRunning(): boolean;
}
//# sourceMappingURL=replQueue.d.ts.map