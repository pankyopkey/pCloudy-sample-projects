import type { Capabilities, Options } from '@wdio/types';
import RunnableStats from './runnable.js';
/**
 * Class to capture statistics about a test run. A test run is a single instance that
 * runs one or more spec files
 */
export default class RunnerStats extends RunnableStats {
    cid: string;
    capabilities: Capabilities.ResolvedTestrunnerCapabilities;
    sanitizedCapabilities: string;
    config: Options.Testrunner;
    specs: string[];
    sessionId: string;
    isMultiremote: boolean;
    instanceOptions: Record<string, Options.WebdriverIO>;
    retry?: number;
    failures?: number;
    retries?: number;
    error?: string;
    constructor(runner: Options.RunnerStart);
}
//# sourceMappingURL=runner.d.ts.map