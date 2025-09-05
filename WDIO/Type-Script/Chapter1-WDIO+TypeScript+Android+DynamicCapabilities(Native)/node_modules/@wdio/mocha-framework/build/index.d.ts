import type { Services } from '@wdio/types';
import type { MochaOpts as MochaOptsImport, FrameworkMessage, MochaError } from './types.js';
import type { EventEmitter } from 'node:events';
type EventTypes = 'hook' | 'test' | 'suite';
interface ParsedConfiguration extends Required<WebdriverIO.Config> {
    rootDir: string;
    mochaOpts: MochaOptsImport;
}
/**
 * Mocha runner
 */
declare class MochaAdapter {
    private _cid;
    private _config;
    private _specs;
    private _capabilities;
    private _reporter;
    private _mocha?;
    private _runner?;
    private _specLoadError?;
    private _level;
    private _hasTests;
    private _suiteIds;
    private _suiteCnt;
    private _hookCnt;
    private _testCnt;
    private _suiteStartDate;
    constructor(_cid: string, _config: ParsedConfiguration, _specs: string[], _capabilities: WebdriverIO.Capabilities, _reporter: EventEmitter);
    init(): Promise<this>;
    _loadFiles(mochaOpts: MochaOptsImport): Promise<void>;
    hasTests(): boolean;
    run(): Promise<unknown>;
    /**
     * Hooks which are added as true Mocha hooks need to call done() to notify async
     */
    wrapHook(hookName: keyof Services.HookFunctions): () => Promise<void | unknown[]>;
    prepareMessage(hookName: keyof Services.HookFunctions): import("./types.js").FormattedMessage;
    emit(event: string, payload: Record<string, unknown>, err?: MochaError): void;
    getSyncEventIdStart(type: EventTypes): string;
    getSyncEventIdEnd(type: EventTypes): string;
    getUID(message: FrameworkMessage): string;
}
declare const adapterFactory: {
    init?: Function;
};
export default adapterFactory;
export { MochaAdapter, adapterFactory };
export * from './types.js';
declare global {
    namespace WebdriverIO {
        interface MochaOpts extends MochaOptsImport {
        }
    }
}
//# sourceMappingURL=index.d.ts.map