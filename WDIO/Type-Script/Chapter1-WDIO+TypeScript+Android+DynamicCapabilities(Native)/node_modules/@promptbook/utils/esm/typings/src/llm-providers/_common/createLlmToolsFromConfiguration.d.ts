import { MultipleLlmExecutionTools } from '../multiple/MultipleLlmExecutionTools';
import type { LlmToolsConfiguration } from './LlmToolsConfiguration';
/**
 * Options for `createLlmToolsFromEnv`
 *
 * @private internal type for `createLlmToolsFromEnv` and `getLlmToolsForTestingAndScriptsAndPlayground`
 */
export type CreateLlmToolsFromConfigurationOptions = {
    /**
     * This will will be passed to the created `LlmExecutionTools`
     *
     * @default false
     */
    isVerbose?: boolean;
};
/**
 * @@@
 *
 * Note: This function is not cached, every call creates new instance of `MultipleLlmExecutionTools`
 *
 * @returns @@@
 * @public exported from `@promptbook/core`
 */
export declare function createLlmToolsFromConfiguration(configuration: LlmToolsConfiguration, options?: CreateLlmToolsFromConfigurationOptions): MultipleLlmExecutionTools;
/**
 * TODO: [🎌] Togethere with `createLlmToolsFromConfiguration` + 'EXECUTION_TOOLS_CLASSES' gets to `@promptbook/core` ALL model providers, make this more efficient
 * TODO: [🧠][🎌] Dynamically install required providers
 * TODO: @@@ write discussion about this - wizzard
 * TODO: [🧠][🍛] Which name is better `createLlmToolsFromConfig` or `createLlmToolsFromConfiguration`?
 * TODO: [🧠] Is there some meaningfull way how to test this util
 * TODO: This should be maybe not under `_common` but under `utils`
 */
