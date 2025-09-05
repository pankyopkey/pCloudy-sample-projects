import type { ReadonlyDeep } from 'type-fest';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { ReservedParameters } from '../../types/typeAliases';
/**
 * @@@
 *
 * @private internal type of `getReservedParametersForTemplate`
 */
type GetReservedParametersForTemplateOptions = {
    /**
     * @@@
     */
    readonly preparedPipeline: ReadonlyDeep<PipelineJson>;
    /**
     * @@@
     */
    readonly template: ReadonlyDeep<TemplateJson>;
    /**
     * @@@
     */
    readonly pipelineIdentification: string;
};
/**
 * @@@
 *
 * @private internal utility of `createPipelineExecutor`
 */
export declare function getReservedParametersForTemplate(options: GetReservedParametersForTemplateOptions): Promise<Readonly<ReservedParameters>>;
export {};
