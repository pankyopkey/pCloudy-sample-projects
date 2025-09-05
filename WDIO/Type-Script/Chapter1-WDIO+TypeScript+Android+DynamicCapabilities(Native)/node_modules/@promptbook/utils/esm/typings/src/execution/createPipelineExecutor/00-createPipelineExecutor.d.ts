import type { PipelineExecutor } from '../PipelineExecutor';
import type { CreatePipelineExecutorOptions } from './00-CreatePipelineExecutorOptions';
/**
 * Creates executor function from pipeline and execution tools.
 *
 * @returns The executor function
 * @throws {PipelineLogicError} on logical error in the pipeline
 * @public exported from `@promptbook/core`
 */
export declare function createPipelineExecutor(options: CreatePipelineExecutorOptions): PipelineExecutor;
/**
 * TODO: [🐚] Change onProgress to object that represents the running execution, can be subscribed via RxJS to and also awaited
 */ 
