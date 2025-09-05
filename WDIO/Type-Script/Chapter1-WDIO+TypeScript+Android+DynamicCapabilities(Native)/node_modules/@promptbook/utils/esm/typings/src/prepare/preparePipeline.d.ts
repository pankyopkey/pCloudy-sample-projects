import type { PipelineJson } from '../types/PipelineJson/PipelineJson';
import type { PrepareOptions } from './PrepareOptions';
/**
 * Prepare pipeline from string (markdown) format to JSON format
 *
 * Note: This function does not validate logic of the pipeline
 * Note: This function acts as part of compilation process
 * Note: When the pipeline is already prepared, it returns the same pipeline
 * @public exported from `@promptbook/core`
 */
export declare function preparePipeline(pipeline: PipelineJson, options: PrepareOptions): Promise<PipelineJson>;
/**
 * TODO: Write tests for `preparePipeline`
 * TODO: [🏏] Leverage the batch API and build queues @see https://platform.openai.com/docs/guides/batch
 * TODO: [🧊] In future one preparation can take data from previous preparation and save tokens and time
 * TODO: [🛠] Actions, instruments (and maybe knowledge) => Functions and tools
 * TODO: [🧠][♏] Maybe if expecting JSON (In Anthropic Claude and other models without non-json) and its not specified in prompt content, append the instructions
 *       @see https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/increase-consistency#specify-the-desired-output-format
 */
