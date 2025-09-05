import type { AvailableModel } from '../../execution/AvailableModel';
import type { number_usd } from '../../types/typeAliases';
/**
 * List of available Anthropic Claude models with pricing
 *
 * Note: Done at 2024-08-16
 *
 * @see https://docs.anthropic.com/en/docs/models-overview
 * @public exported from `@promptbook/anthropic-claude`
 */
export declare const ANTHROPIC_CLAUDE_MODELS: Array<AvailableModel & {
    pricing?: {
        readonly prompt: number_usd;
        readonly output: number_usd;
    };
}>;
/**
 * Note: [🤖] Add models of new variant
 * TODO: [🧠][main] !!! Add embedding models OR Anthropic has only chat+completion models?
 * TODO: [🧠] Some mechanism to propagate unsureness
 * TODO: [🧠][👮‍♀️] Put here more info like description, isVision, trainingDateCutoff, languages, strengths (	Top-level performance, intelligence, fluency, and understanding), contextWindow,...
 * TODO: [🎰] Some mechanism to auto-update available models
 */
