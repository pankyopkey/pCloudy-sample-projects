import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { PipelineString } from '../../types/PipelineString';
import type { string_json } from '../../types/typeAliases';
/**
 * Import the pipeline.ptbk.md or pipeline.ptbk.json file
 *
 * Note: Using here custom import to work in jest tests
 * Note: Using sync version is 💩 in the production code, but it's ok here in tests
 *
 * @param path - The path to the file relative to samples/pipelines directory
 * @private internal function of tests
 */
export declare function importPipelineWithoutPreparation(path: `${string}.ptbk.md`): PipelineString;
export declare function importPipelineWithoutPreparation(path: `${string}.ptbk.json`): PipelineJson;
/**
 * Import the pipeline.ptbk.json file as parsed JSON
 *
 * @private internal function of tests
 */
export declare function importPipelineJson(path: `${string}.ptbk.json`): PipelineJson;
/**
 * Import the pipeline.ptbk.json file as string
 *
 * @private internal function of tests
 */
export declare function importPipelineJsonAsString(path: `${string}.ptbk.json`): string_json<PipelineJson>;
/**
 * TODO: [🥯] This should be part of scripting + testing utilities set which are not builded into packages
 */
