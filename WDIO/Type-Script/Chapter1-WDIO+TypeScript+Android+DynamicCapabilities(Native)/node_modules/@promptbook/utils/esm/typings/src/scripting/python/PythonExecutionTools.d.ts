import type { CommonExecutionToolsOptions } from '../../execution/CommonExecutionToolsOptions';
import type { ScriptExecutionTools } from '../../execution/ScriptExecutionTools';
import type { ScriptExecutionToolsExecuteOptions } from '../../execution/ScriptExecutionTools';
/**
 * ScriptExecutionTools for Python
 *
 * Warning: This is not implemented yet
 *
 * @private still in development
 */
export declare class PythonExecutionTools implements ScriptExecutionTools {
    private readonly options;
    constructor(options?: CommonExecutionToolsOptions);
    /**
     * Executes a Python
     */
    execute(options: ScriptExecutionToolsExecuteOptions): Promise<string>;
}
