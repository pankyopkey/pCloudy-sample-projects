import type OpenAI from 'openai';
import type { PartialDeep } from 'type-fest';
import type { PromptResultUsage } from '../../execution/PromptResultUsage';
import type { Prompt } from '../../types/Prompt';
/**
 * Computes the usage of the OpenAI API based on the response from OpenAI
 *
 * @param promptContent The content of the prompt
 * @param resultContent The content of the result (for embedding prompts or failed prompts pass empty string)
 * @param rawResponse The raw response from OpenAI API
 * @throws {PipelineExecutionError} If the usage is not defined in the response from OpenAI
 * @private internal utility of `OpenAiExecutionTools`
 */
export declare function computeOpenAiUsage(promptContent: Prompt['content'], // <- Note: Intentionally using [] to access type properties to bring jsdoc from Prompt/PromptResult to consumer
resultContent: string, rawResponse: PartialDeep<Pick<OpenAI.Chat.Completions.ChatCompletion | OpenAI.Completions.Completion | OpenAI.Embeddings.CreateEmbeddingResponse, 'model' | 'usage'>>): PromptResultUsage;
/**
 * TODO: [🤝] DRY Maybe some common abstraction between `computeOpenAiUsage` and `computeAnthropicClaudeUsage`
 */
