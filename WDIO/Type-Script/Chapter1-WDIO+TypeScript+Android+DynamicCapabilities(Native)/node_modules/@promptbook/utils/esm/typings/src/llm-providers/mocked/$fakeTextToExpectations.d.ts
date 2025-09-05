import type { Expectations } from '../../types/PipelineJson/Expectations';
import type { string_postprocessing_function_name } from '../../types/typeAliases';
/**
 * Gets the expectations and creates a fake text that meets the expectations
 *
 * Note: `$` is used to indicate that this function is not a pure function - it is not deterministic
 * Note: You can provide postprocessing functions to modify the text before checking the expectations
 *       The result will be the text BEFORE the postprocessing
 *
 * @private internal utility for MockedFackedLlmExecutionTools
 */
export declare function $fakeTextToExpectations(expectations: Expectations, postprocessingFunctionNames?: Array<string_postprocessing_function_name>): Promise<string>;
/**
 * TODO: [💝] Unite object for expecting amount and format - use here also a format
 */
