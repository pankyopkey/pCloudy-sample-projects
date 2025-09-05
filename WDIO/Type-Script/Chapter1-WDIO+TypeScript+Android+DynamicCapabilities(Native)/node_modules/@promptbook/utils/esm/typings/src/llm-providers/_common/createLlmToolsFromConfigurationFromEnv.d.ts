import type { LlmToolsConfiguration } from './LlmToolsConfiguration';
/**
 * @@@
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
export declare function createLlmToolsFromConfigurationFromEnv(): LlmToolsConfiguration;
/**
 * TODO: [🧠][🪁] Maybe do allow to do auto-install if package not registered and not found
 * TODO: Add Azure OpenAI
 * TODO: [🧠][🍛]
 * TODO: [🧠] Is there some meaningfull way how to test this util
 * Note: [🟢] This code should never be published outside of `@promptbook/node` and `@promptbook/cli` and `@promptbook/cli`
 * TODO: [👷‍♂️] @@@ Manual about construction of llmTools
 * TODO: This should be maybe not under `_common` but under `utils`
 * TODO: [🧠] Maybe pass env as argument
 */
