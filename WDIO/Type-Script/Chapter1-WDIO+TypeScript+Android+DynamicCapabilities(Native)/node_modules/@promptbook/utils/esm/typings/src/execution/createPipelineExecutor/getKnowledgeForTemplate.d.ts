import type { ReadonlyDeep } from 'type-fest';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { string_markdown } from '../../types/typeAliases';
import type { string_parameter_value } from '../../types/typeAliases';
/**
 * @@@
 *
 * @private internal type of `getKnowledgeForTemplate`
 */
type GetKnowledgeForTemplateOptions = {
    /**
     * @@@
     */
    readonly preparedPipeline: ReadonlyDeep<PipelineJson>;
    /**
     * @@@
     */
    readonly template: ReadonlyDeep<TemplateJson>;
};
/**
 * @@@
 *
 * @private internal utility of `createPipelineExecutor`
 */
export declare function getKnowledgeForTemplate(options: GetKnowledgeForTemplateOptions): Promise<string_parameter_value & string_markdown>;
export {};
