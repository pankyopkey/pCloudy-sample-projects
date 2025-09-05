import type HookStats from './hook.js';
import RunnableStats from './runnable.js';
import type TestStats from './test.js';
import type { Tag } from '../types.js';
export interface Suite {
    type?: string;
    title: string;
    parent?: string;
    fullTitle: string;
    pending?: boolean;
    file: string;
    duration?: number;
    cid?: string;
    specs?: string[];
    uid?: string;
    tags?: string[] | Tag[];
    description?: string;
    rule?: string;
    retries?: number;
}
/**
 * Class describing statistics about a single suite.
 */
export default class SuiteStats extends RunnableStats {
    uid: string;
    cid?: string;
    file: string;
    title: string;
    fullTitle: string;
    tags?: string[] | Tag[];
    tests: TestStats[];
    hooks: HookStats[];
    suites: SuiteStats[];
    parent?: string;
    retries: number;
    /**
     * an array of hooks and tests stored in order as they happen
     */
    hooksAndTests: (HookStats | TestStats)[];
    description?: string;
    rule?: string;
    constructor(suite: Suite);
    /**
     * Mark suite as retried and remove previous history.
     */
    retry(): void;
}
//# sourceMappingURL=suite.d.ts.map