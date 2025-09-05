import type { PipelineJson } from '../types/PipelineJson/PipelineJson';
import type { PipelineString } from '../types/PipelineString';
/**
 * Converts promptbook in JSON format to string format
 *
 * @param pipelineJson Promptbook in JSON format (.ptbk.json)
 * @returns Promptbook in string format (.ptbk.md)
 * @public exported from `@promptbook/core`
 */
export declare function pipelineJsonToString(pipelineJson: PipelineJson): PipelineString;
/**
 * TODO: [🛋] Implement new features and commands into `pipelineJsonToString` + `templateParameterJsonToString` , use `stringifyCommand`
 * TODO: [🧠] Is there a way to auto-detect missing features in pipelineJsonToString
 * TODO: [🏛] Maybe make some markdown builder
 * TODO: [🏛] Escape all
 * TODO: [🧠] Should be in generated .ptbk.md file GENERATOR_WARNING
 */
