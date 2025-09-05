import type BaseReporter from './reporter.js';
import type { TestFramework } from './types.js';
type WDIOErrorEvent = Partial<Pick<ErrorEvent, 'filename' | 'message' | 'error'>> & {
    hasViteError?: boolean;
};
interface Event {
    type: string;
    title: string;
    fullTitle: string;
    specs: string[];
}
declare global {
    interface Window {
        __wdioErrors__: WDIOErrorEvent[];
        __wdioEvents__: Event[];
        __wdioFailures__: number;
        __coverage__?: unknown;
    }
}
export default class BrowserFramework implements Omit<TestFramework, 'init'> {
    #private;
    private _cid;
    private _config;
    private _specs;
    private _reporter;
    constructor(_cid: string, _config: WebdriverIO.Config & {
        sessionId?: string;
    }, _specs: string[], _reporter: BaseReporter);
    /**
     * always return true as it is irrelevant for component testing
     */
    hasTests(): boolean;
    init(): TestFramework;
    run(): Promise<number>;
    static init(cid: string, config: WebdriverIO.Config, specs: string[], _: unknown, reporter: BaseReporter): BrowserFramework;
}
export {};
//# sourceMappingURL=browser.d.ts.map