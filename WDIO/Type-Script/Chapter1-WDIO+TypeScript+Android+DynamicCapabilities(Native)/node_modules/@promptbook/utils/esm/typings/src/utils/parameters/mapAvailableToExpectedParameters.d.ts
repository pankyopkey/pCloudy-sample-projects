import type { string_parameter_name } from '../../types/typeAliases';
import type { string_parameter_value } from '../../types/typeAliases';
/**
 * @@@
 */
type MakeapAvailableToExpectedParametersOptions = {
    /**
     * @@@
     */
    readonly expectedParameters: Readonly<Record<string_parameter_name, null>>;
    /**
     * @@@
     */
    readonly availableParameters: Readonly<Record<string_parameter_name, string_parameter_value>>;
};
/**
 * Maps available parameters to expected parameters
 *
 * The strategy is:
 * 1) @@@
 * 2) @@@
 *
 * @throws {PipelineExecutionError} @@@
 * @private within the repository used in `createPipelineExecutor`
 */
export declare function mapAvailableToExpectedParameters(options: MakeapAvailableToExpectedParametersOptions): Readonly<Record<string_parameter_name, string_parameter_value>>;
export {};
