import type { Promisable, ReadonlyDeep } from 'type-fest';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TaskProgress } from '../../types/TaskProgress';
import type { Parameters } from '../../types/typeAliases';
import type { ExecutionTools } from '../ExecutionTools';
import type { PipelineExecutorResult } from '../PipelineExecutorResult';
import type { CreatePipelineExecutorSettings } from './00-CreatePipelineExecutorSettings';
/**
 * @@@
 *
 * @private internal type of `executePipelinex`
 */
type ExecutePipelineOptions = {
    /**
     * @@@
     */
    readonly inputParameters: Readonly<Parameters>;
    /**
     * @@@
     */
    readonly tools: ExecutionTools;
    /**
     * @@@
     */
    onProgress?(taskProgress: TaskProgress): Promisable<void>;
    /**
     * @@@
     */
    readonly pipeline: PipelineJson;
    /**
     * @@@
     */
    readonly preparedPipeline: ReadonlyDeep<PipelineJson>;
    /**
     * @@@
     */
    readonly setPreparedPipeline: (preparedPipeline: ReadonlyDeep<PipelineJson>) => void;
    /**
     * @@@
     */
    readonly pipelineIdentification: string;
    /**
     * Settings for the pipeline executor
     */
    readonly settings: CreatePipelineExecutorSettings;
};
/**
 * @@@
 *
 * Note: This is not a `PipelineExecutor` (which is binded with one exact pipeline), but a utility function of `createPipelineExecutor` which creates `PipelineExecutor`
 *
 * @private internal utility of `createPipelineExecutor`
 */
export declare function executePipeline(options: ExecutePipelineOptions): Promise<PipelineExecutorResult>;
export {};
/**
 * TODO: [🐚] Change onProgress to object that represents the running execution, can be subscribed via RxJS to and also awaited
 */ 
