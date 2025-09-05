import type { ReadonlyDeep } from 'type-fest';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { string_parameter_name } from '../../types/typeAliases';
/**
 * Parses the template and returns the set of all used parameters
 *
 * @param template the template with used parameters
 * @returns the set of parameter names
 * @throws {ParseError} if the script is invalid
 * @public exported from `@promptbook/utils`
 */
export declare function extractParameterNamesFromTemplate(template: ReadonlyDeep<Pick<TemplateJson, 'title' | 'description' | 'templateType' | 'content' | 'preparedContent' | 'jokerParameterNames' | 'foreach'>>): Set<string_parameter_name>;
/**
 * TODO: [🔣] If script require contentLanguage
 */
