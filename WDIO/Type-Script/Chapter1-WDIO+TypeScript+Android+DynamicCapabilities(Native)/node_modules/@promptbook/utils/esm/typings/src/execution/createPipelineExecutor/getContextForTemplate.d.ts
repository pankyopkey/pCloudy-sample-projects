import type { ReadonlyDeep } from 'type-fest';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { string_markdown } from '../../types/typeAliases';
import type { string_parameter_value } from '../../types/typeAliases';
/**
 * @@@
 *
 * @private internal utility of `createPipelineExecutor`
 */
export declare function getContextForTemplate(template: ReadonlyDeep<TemplateJson>): Promise<string_parameter_value & string_markdown>;
