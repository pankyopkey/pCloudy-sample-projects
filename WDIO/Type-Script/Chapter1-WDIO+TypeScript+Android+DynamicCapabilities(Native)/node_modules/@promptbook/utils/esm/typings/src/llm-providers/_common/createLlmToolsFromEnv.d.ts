import { MultipleLlmExecutionTools } from '../multiple/MultipleLlmExecutionTools';
import type { CreateLlmToolsFromConfigurationOptions } from './createLlmToolsFromConfiguration';
/**
 * @@@
 *
 * Note: This function is not cached, every call creates new instance of `MultipleLlmExecutionTools`
 *
 * @@@ .env
 *
 * It looks for environment variables:
 * - `process.env.OPENAI_API_KEY`
 * - `process.env.ANTHROPIC_CLAUDE_API_KEY`
 *
 * @returns @@@
 * @public exported from `@promptbook/node`
 */
export declare function createLlmToolsFromEnv(options?: CreateLlmToolsFromConfigurationOptions): MultipleLlmExecutionTools;
/**
 * TODO: @@@ write `createLlmToolsFromEnv` vs `createLlmToolsFromConfigurationFromEnv` vs `createLlmToolsFromConfiguration`
 * TODO: [🧠][🍛] Which name is better `createLlmToolsFromEnv` or `createLlmToolsFromEnvironment`?
 * TODO: [🧠] Is there some meaningfull way how to test this util
 * Note: [🟢] This code should never be published outside of `@promptbook/node` and `@promptbook/cli` and `@promptbook/cli`
 * TODO: [🥃] Allow `ptbk make` without llm tools
 * TODO: This should be maybe not under `_common` but under `utils`
 */
