import { Promisable, ReadonlyDeep } from 'type-fest';
import { MultipleLlmExecutionTools } from '../../llm-providers/multiple/MultipleLlmExecutionTools';
import type { ExecutionReportJson } from '../../types/execution-report/ExecutionReportJson';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { TaskProgress } from '../../types/TaskProgress';
import type { Parameters } from '../../types/typeAliases';
import type { ExecutionTools } from '../ExecutionTools';
import type { CreatePipelineExecutorSettings } from './00-CreatePipelineExecutorSettings';
/**
 * @@@
 *
 * @private internal type of `executeTemplate`
 */
type executeSingleTemplateOptions = {
    /**
     * @@@
     */
    readonly currentTemplate: ReadonlyDeep<TemplateJson>;
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
    readonly tools: Omit<ExecutionTools, 'llm'>;
    /**
     * @@@
     */
    readonly llmTools: MultipleLlmExecutionTools;
    /**
     * @@@
     */
    readonly onProgress: (taskProgress: TaskProgress) => Promisable<void>;
    /**
     * Settings for the pipeline executor
     */
    readonly settings: CreatePipelineExecutorSettings;
    /**
     * @@@
     */
    readonly $executionReport: ExecutionReportJson;
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
export declare function executeTemplate(options: executeSingleTemplateOptions): Promise<Readonly<Parameters>>;
export {};
/**
 * TODO: [🤹‍♂️]
 */
/**
 * TODO: [🐚] Change onProgress to object that represents the running execution, can be subscribed via RxJS to and also awaited
 */
