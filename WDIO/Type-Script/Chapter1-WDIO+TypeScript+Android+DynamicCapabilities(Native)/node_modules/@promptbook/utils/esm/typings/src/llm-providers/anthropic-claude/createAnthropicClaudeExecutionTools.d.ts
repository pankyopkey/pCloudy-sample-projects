import { RemoteLlmExecutionTools } from '../remote/RemoteLlmExecutionTools';
import { AnthropicClaudeExecutionTools } from './AnthropicClaudeExecutionTools';
import type { AnthropicClaudeExecutionToolsOptions } from './AnthropicClaudeExecutionToolsOptions';
/**
 * Execution Tools for calling Anthropic Claude API.
 *
 * @public exported from `@promptbook/anthropic-claude`
 */
export declare const createAnthropicClaudeExecutionTools: ((options: AnthropicClaudeExecutionToolsOptions) => AnthropicClaudeExecutionTools | RemoteLlmExecutionTools) & {
    packageName: string;
    className: string;
};
/**
 * TODO: [🧠][main] !!!! Make anonymous this with all LLM providers
 * TODO: [🧠][🧱][main] !!!! Maybe change all `new AnthropicClaudeExecutionTools` -> `createAnthropicClaudeExecutionTools` in manual
 * TODO: [🧠] Maybe auto-detect usage in browser and determine default value of `isProxied`
 * TODO: [🦺] Is there some way how to put `packageName` and `className` on top and function definition on bottom?
 * TODO: [🎶] Naming "constructor" vs "creator" vs "factory"
 */
