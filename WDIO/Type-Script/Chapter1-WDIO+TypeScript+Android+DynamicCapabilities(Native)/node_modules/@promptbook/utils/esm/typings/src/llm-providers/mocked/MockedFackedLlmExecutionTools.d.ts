import type { AvailableModel } from '../../execution/AvailableModel';
import type { CommonExecutionToolsOptions } from '../../execution/CommonExecutionToolsOptions';
import type { LlmExecutionTools } from '../../execution/LlmExecutionTools';
import type { ChatPromptResult } from '../../execution/PromptResult';
import type { CompletionPromptResult } from '../../execution/PromptResult';
import type { EmbeddingPromptResult } from '../../execution/PromptResult';
import type { Prompt } from '../../types/Prompt';
import type { string_markdown } from '../../types/typeAliases';
import type { string_markdown_text } from '../../types/typeAliases';
import type { string_title } from '../../types/typeAliases';
/**
 * Mocked execution Tools for just faking expected responses for testing purposes
 *
 * @public exported from `@promptbook/fake-llm`
 */
export declare class MockedFackedLlmExecutionTools implements LlmExecutionTools {
    private readonly options;
    constructor(options?: CommonExecutionToolsOptions);
    get title(): string_title & string_markdown_text;
    get description(): string_markdown;
    /**
     * Does nothing, just to implement the interface
     */
    checkConfiguration(): void;
    /**
     * List all available fake-models that can be used
     */
    listModels(): Array<AvailableModel>;
    /**
     * Fakes chat model
     */
    callChatModel(prompt: Pick<Prompt, 'content' | 'parameters' | 'modelRequirements' | 'expectations' | 'postprocessingFunctionNames'>): Promise<ChatPromptResult & CompletionPromptResult>;
    /**
     * Fakes completion model
     */
    callCompletionModel(prompt: Pick<Prompt, 'content' | 'parameters' | 'modelRequirements' | 'expectations' | 'postprocessingFunctionNames'>): Promise<CompletionPromptResult>;
    /**
     * Fakes embedding model
     */
    callEmbeddingModel(prompt: Pick<Prompt, 'content' | 'parameters' | 'modelRequirements' | 'expectations' | 'postprocessingFunctionNames'>): Promise<EmbeddingPromptResult>;
}
/**
 * TODO: [🧠][🈁] Maybe use `isDeterministic` from options
 */
