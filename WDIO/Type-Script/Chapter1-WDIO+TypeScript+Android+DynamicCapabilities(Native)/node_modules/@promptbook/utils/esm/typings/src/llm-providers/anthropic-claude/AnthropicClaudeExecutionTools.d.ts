import Anthropic from '@anthropic-ai/sdk';
import type { AvailableModel } from '../../execution/AvailableModel';
import type { LlmExecutionTools } from '../../execution/LlmExecutionTools';
import type { ChatPromptResult } from '../../execution/PromptResult';
import type { Prompt } from '../../types/Prompt';
import type { string_markdown } from '../../types/typeAliases';
import type { string_markdown_text } from '../../types/typeAliases';
import type { string_title } from '../../types/typeAliases';
import type { AnthropicClaudeExecutionToolsDirectOptions } from './AnthropicClaudeExecutionToolsOptions';
/**
 * Execution Tools for calling Anthropic Claude API.
 *
 * @public exported from `@promptbook/anthropic-claude`
 * @deprecated use `createAnthropicClaudeExecutionTools` instead
 */
export declare class AnthropicClaudeExecutionTools implements LlmExecutionTools {
    private readonly options;
    /**
     * Anthropic Claude API client.
     */
    private client;
    /**
     * Creates Anthropic Claude Execution Tools.
     *
     * @param options which are relevant are directly passed to the Anthropic Claude client
     */
    constructor(options?: AnthropicClaudeExecutionToolsDirectOptions);
    get title(): string_title & string_markdown_text;
    get description(): string_markdown;
    getClient(): Promise<Anthropic>;
    /**
     * Check the `options` passed to `constructor`
     */
    checkConfiguration(): Promise<void>;
    /**
     * List all available Anthropic Claude models that can be used
     */
    listModels(): Array<AvailableModel>;
    /**
     * Calls Anthropic Claude API to use a chat model.
     */
    callChatModel(prompt: Pick<Prompt, 'content' | 'parameters' | 'modelRequirements'>): Promise<ChatPromptResult>;
    /**
     * Get the model that should be used as default
     */
    private getDefaultModel;
    /**
     * Default model for chat variant.
     */
    private getDefaultChatModel;
}
/**
 * TODO:  [🍆] JSON mode
 * TODO: [🧠] Maybe handle errors via transformAnthropicError (like transformAzureError)
 * TODO: Maybe Create some common util for callChatModel and callCompletionModel
 * TODO: Maybe make custom OpenAiError
 * TODO: [🧠][🈁] Maybe use `isDeterministic` from options
 * TODO: [🧠][🌰] Allow to pass `title` for tracking purposes
 * TODO: [📅] Maybe instead of `RemoteLlmExecutionToolsOptions` use `proxyWithAnonymousRemoteServer` (if implemented)
 */
