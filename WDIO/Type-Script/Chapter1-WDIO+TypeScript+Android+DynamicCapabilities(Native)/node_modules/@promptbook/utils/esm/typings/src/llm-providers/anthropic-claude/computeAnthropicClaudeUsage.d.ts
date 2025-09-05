import type Anthropic from '@anthropic-ai/sdk';
import type { PartialDeep } from 'type-fest';
import type { PromptResultUsage } from '../../execution/PromptResultUsage';
import type { Prompt } from '../../types/Prompt';
/**
 * Computes the usage of the Anthropic Claude API based on the response from Anthropic Claude
 *
 * @param promptContent The content of the prompt
 * @param resultContent The content of the result (for embedding prompts or failed prompts pass empty string)
 * @param rawResponse The raw response from Anthropic Claude API
 * @throws {PipelineExecutionError} If the usage is not defined in the response from Anthropic Claude
 * @private internal utility of `AnthropicClaudeExecutionTools`
 */
export declare function computeAnthropicClaudeUsage(promptContent: Prompt['content'], // <- Note: Intentionally using [] to access type properties to bring jsdoc from Prompt/PromptResult to consumer
resultContent: string, rawResponse: PartialDeep<Pick<Anthropic.Messages.Message, 'model' | 'usage'>>): PromptResultUsage;
/**
 * TODO: [🤝] DRY Maybe some common abstraction between `computeOpenAiUsage` and `computeAnthropicClaudeUsage`
 */
