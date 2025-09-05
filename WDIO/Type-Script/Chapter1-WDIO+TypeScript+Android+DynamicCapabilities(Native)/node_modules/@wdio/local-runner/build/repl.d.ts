import type vm from 'node:vm';
import type { ReplConfig, ReplCallback } from '@wdio/repl';
import WDIORepl from '@wdio/repl';
import type { ChildProcess } from 'node:child_process';
export default class WDIORunnerRepl extends WDIORepl {
    childProcess: ChildProcess;
    callback?: ReplCallback;
    commandIsRunning: boolean;
    constructor(childProcess: ChildProcess, options: ReplConfig);
    private _getError;
    eval(cmd: string, context: vm.Context, filename: string, callback: ReplCallback): void;
    onResult(params: Record<string, string>): void;
    start(context?: vm.Context): Promise<unknown>;
}
//# sourceMappingURL=repl.d.ts.map