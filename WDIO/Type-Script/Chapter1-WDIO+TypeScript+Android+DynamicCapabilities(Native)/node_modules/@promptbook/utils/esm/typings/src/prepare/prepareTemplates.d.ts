import type { PipelineJson } from '../types/PipelineJson/PipelineJson';
import type { TemplateJson } from '../types/PipelineJson/TemplateJson';
import type { PrepareOptions } from './PrepareOptions';
type PrepareTemplateInput = Pick<PipelineJson, 'templates' | 'parameters'> & {
    /**
     * @@@
     */
    readonly knowledgePiecesCount: number;
};
type PreparedTemplates = {
    /**
     * @@@ Sequence of templates that are chained together to form a pipeline
     */
    readonly templatesPrepared: Array<TemplateJson>;
};
/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export declare function prepareTemplates(pipeline: PrepareTemplateInput, options: PrepareOptions): Promise<PreparedTemplates>;
export {};
/**
 * TODO: [🧠] Add context to each template (if missing)
 * TODO: [🧠] What is better name `prepareTemplate` or `prepareTemplateAndParameters`
 * TODO: [♨][main] !!! Prepare index the samples and maybe templates
 * TODO: Write tests for `preparePipeline`
 * TODO: [🏏] Leverage the batch API and build queues @see https://platform.openai.com/docs/guides/batch
 * TODO: [🧊] In future one preparation can take data from previous preparation and save tokens and time
 * TODO: [🛠] Actions, instruments (and maybe knowledge) => Functions and tools
 */
