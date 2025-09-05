import type { ReadonlyDeep } from 'type-fest';
import { PipelineExecutionError } from '../../errors/PipelineExecutionError';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { Parameters } from '../../types/typeAliases';
/**
 * @@@
 *
 * @private internal type of `createPipelineExecutor`
 */
type FilterJustOutputParametersOptions = {
    /**
     * @@@
     */
    readonly preparedPipeline: ReadonlyDeep<PipelineJson>;
    /**
     * @@@
     */
    readonly parametersToPass: Readonly<Parameters>;
    /**
     * @@@
     */
    readonly $warnings: PipelineExecutionError[];
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
export declare function filterJustOutputParameters(options: FilterJustOutputParametersOptions): Parameters;
export {};
