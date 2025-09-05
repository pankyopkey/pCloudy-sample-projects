import type { TODO_any } from '../../utils/organization/TODO_any';
import type { ExecuteAttemptsOptions } from './40-executeAttempts';
/**
 * @@@
 *
 * @private internal type of `executeFormatSubvalues`
 */
type ExecuteFormatCellsOptions = ExecuteAttemptsOptions;
/**
 * @@@
 *
 * @private internal utility of `createPipelineExecutor`
 */
export declare function executeFormatSubvalues(options: ExecuteFormatCellsOptions): Promise<TODO_any>;
export {};
