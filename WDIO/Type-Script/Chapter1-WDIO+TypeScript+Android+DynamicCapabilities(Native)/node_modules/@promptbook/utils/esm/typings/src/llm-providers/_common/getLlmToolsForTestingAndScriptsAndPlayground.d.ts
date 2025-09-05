import '../../_packages/cli.index';
import type { CreateLlmToolsFromConfigurationOptions } from './createLlmToolsFromConfiguration';
import type { LlmExecutionToolsWithTotalUsage } from './utils/count-total-usage/LlmExecutionToolsWithTotalUsage';
type GetLlmToolsForTestingAndScriptsAndPlaygroundOptions = CreateLlmToolsFromConfigurationOptions & {
    /**
     * @@@
     *
     * @default false
     */
    isCacheReloaded?: boolean;
};
/**
 * Returns LLM tools for testing purposes
 *
 * @private within the repository - JUST FOR TESTS, SCRIPTS AND PLAYGROUND
 */
export declare function getLlmToolsForTestingAndScriptsAndPlayground(options?: GetLlmToolsForTestingAndScriptsAndPlaygroundOptions): LlmExecutionToolsWithTotalUsage;
export {};
/**
 * Note: [⚪] This should never be in any released package
 * TODO: [👷‍♂️] @@@ Manual about construction of llmTools
 * TODO: This should be maybe not under `_common` but under `utils-internal` / `utils/internal`
 */
