import type { AvailableModel } from '../../execution/AvailableModel';
import type { LlmExecutionTools } from '../../execution/LlmExecutionTools';
import type { ChatPromptResult } from '../../execution/PromptResult';
import type { CompletionPromptResult } from '../../execution/PromptResult';
import type { EmbeddingPromptResult } from '../../execution/PromptResult';
import type { PromptResult } from '../../execution/PromptResult';
import type { ChatPrompt } from '../../types/Prompt';
import type { CompletionPrompt } from '../../types/Prompt';
import type { EmbeddingPrompt } from '../../types/Prompt';
import type { Prompt } from '../../types/Prompt';
import type { string_markdown } from '../../types/typeAliases';
import type { string_markdown_text } from '../../types/typeAliases';
import type { string_title } from '../../types/typeAliases';
/**
 * Multiple LLM Execution Tools is a proxy server that uses multiple execution tools internally and exposes the executor interface externally.
 *
 * Note: Internal utility of `joinLlmExecutionTools` but exposed type
 * @public exported from `@promptbook/types`
 */
export declare class MultipleLlmExecutionTools implements LlmExecutionTools {
    /**
     * Array of execution tools in order of priority
     */
    readonly llmExecutionTools: Array<LlmExecutionTools>;
    /**
     * Gets array of execution tools in order of priority
     */
    constructor(...llmExecutionTools: Array<LlmExecutionTools>);
    get title(): string_title & string_markdown_text;
    get description(): string_markdown;
    /**
     * Check the configuration of all execution tools
     */
    checkConfiguration(): Promise<void>;
    /**
     * List all available models that can be used
     * This lists is a combination of all available models from all execution tools
     */
    listModels(): Promise<Array<AvailableModel>>;
    /**
     * Calls the best available chat model
     */
    callChatModel(prompt: ChatPrompt): Promise<ChatPromptResult>;
    /**
     * Calls the best available completion model
     */
    callCompletionModel(prompt: CompletionPrompt): Promise<CompletionPromptResult>;
    /**
     * Calls the best available embedding model
     */
    callEmbeddingModel(prompt: EmbeddingPrompt): Promise<EmbeddingPromptResult>;
    /**
     * Calls the best available model
     *
     * Note: This should be private or protected but is public to be usable with duck typing
     */
    callCommonModel(prompt: Prompt): Promise<PromptResult>;
}
/**
 * TODO: [🧠][🎛] Aggregating multiple models - have result not only from one first aviable model BUT all of them
 * TODO: [🏖] If no llmTools have for example not defined `callCompletionModel` this will still return object with defined `callCompletionModel` which just throws `PipelineExecutionError`, make it undefined instead
 *       Look how `countTotalUsage` (and `cacheLlmTools`) implements it
 */
