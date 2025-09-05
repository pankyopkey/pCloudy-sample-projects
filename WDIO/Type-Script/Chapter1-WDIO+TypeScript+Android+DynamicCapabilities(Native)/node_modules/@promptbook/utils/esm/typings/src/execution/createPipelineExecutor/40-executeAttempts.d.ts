import type { ReadonlyDeep } from 'type-fest';
import { MultipleLlmExecutionTools } from '../../llm-providers/multiple/MultipleLlmExecutionTools';
import type { ExecutionReportJson } from '../../types/execution-report/ExecutionReportJson';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { Parameters } from '../../types/typeAliases';
import type { string_parameter_name } from '../../types/typeAliases';
import type { TODO_string } from '../../utils/organization/TODO_string';
import type { ExecutionTools } from '../ExecutionTools';
import type { CreatePipelineExecutorSettings } from './00-CreatePipelineExecutorSettings';
/**
 * @@@
 *
 * @private internal type of `executeAttempts`
 */
export type ExecuteAttemptsOptions = {
    /**
     * @@@
     */
    readonly jokerParameterNames: Readonly<Array<string_parameter_name>>;
    /**
     * @@@
     */
    readonly priority: number;
    /**
     * @@@
     */
    readonly maxAttempts: number;
    /**
     * @@@
     */
    readonly preparedContent: TODO_string;
    /**
     * @@@
     */
    readonly parameters: Readonly<Parameters>;
    /**
     * @@@
     */
    readonly template: ReadonlyDeep<TemplateJson>;
    /**
     * @@@
     */
    readonly preparedPipeline: ReadonlyDeep<PipelineJson>;
    /**
     * @@@
     */
    readonly tools: Omit<ExecutionTools, 'llm'>;
    /**
     * @@@
     */
    readonly llmTools: MultipleLlmExecutionTools;
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
export declare function executeAttempts(options: ExecuteAttemptsOptions): Promise<TODO_string>;
/**
 * TODO: Break into smaller functions
 */
