import type { WriteStream } from 'node:fs';
import { EventEmitter } from 'node:events';
import type { Reporters } from '@wdio/types';
import SuiteStats from './stats/suite.js';
import HookStats from './stats/hook.js';
import TestStats, { type Test } from './stats/test.js';
import RunnerStats from './stats/runner.js';
import type { AfterCommandArgs, BeforeCommandArgs, CommandArgs, Tag, Argument } from './types.js';
type CustomWriteStream = {
    write: (content: unknown) => boolean;
};
export default class WDIOReporter extends EventEmitter {
    options: Partial<Reporters.Options>;
    outputStream: WriteStream | CustomWriteStream;
    failures: number;
    suites: Record<string, SuiteStats>;
    hooks: Record<string, HookStats>;
    tests: Record<string, TestStats>;
    currentSuites: SuiteStats[];
    counts: {
        suites: number;
        tests: number;
        hooks: number;
        passes: number;
        skipping: number;
        failures: number;
        pending: number;
    };
    retries: number;
    runnerStat?: RunnerStats;
    isContentPresent: boolean;
    specs: string[];
    currentSpec?: string;
    constructor(options: Partial<Reporters.Options>);
    /**
     * allows reporter to stale process shutdown process until required sync work
     * is done (e.g. when having to send data to some server or any other async work)
     */
    get isSynchronised(): boolean;
    /**
     * function to write to reporters output stream
     */
    write(content: unknown): void;
    onRunnerStart(_runnerStats: RunnerStats): void;
    onBeforeCommand(_commandArgs: BeforeCommandArgs): void;
    onAfterCommand(_commandArgs: AfterCommandArgs): void;
    onBeforeAssertion(_assertionArgs: unknown): void;
    onAfterAssertion(_assertionArgs: unknown): void;
    onSuiteStart(_suiteStats: SuiteStats): void;
    onHookStart(_hookStat: HookStats): void;
    onHookEnd(_hookStats: HookStats): void;
    onTestStart(_testStats: TestStats): void;
    onTestPass(_testStats: TestStats): void;
    onTestFail(_testStats: TestStats): void;
    onTestRetry(_testStats: TestStats): void;
    onTestSkip(_testStats: TestStats): void;
    onTestPending(_testStats: TestStats): void;
    onTestEnd(_testStats: TestStats): void;
    onSuiteRetry(_suiteStats: SuiteStats): void;
    onSuiteEnd(_suiteStats: SuiteStats): void;
    onRunnerEnd(_runnerStats: RunnerStats): void;
}
/**
 * Returns the browser name from the capabilities
 * @param caps WebdriverIO Capabilities
 * @returns {string} Browser name
 */
declare function getBrowserName(caps: WebdriverIO.Capabilities): any;
export { SuiteStats, Tag, HookStats, TestStats, RunnerStats, BeforeCommandArgs, AfterCommandArgs, CommandArgs, Argument, Test, getBrowserName };
//# sourceMappingURL=index.d.ts.map