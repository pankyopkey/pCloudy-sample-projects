import type { PipelineTemplateCommandParser } from '../_common/types/CommandParser';
import type { TemplateCommand } from './TemplateCommand';
/**
 * Parses the template command
 *
 * @see ./TEMPLATE-README.md for more details
 * @private within the commands folder
 */
export declare const templateCommandParser: PipelineTemplateCommandParser<TemplateCommand>;
/**
 * Note: [⛱] There are two types of KNOWLEDGE, ACTION and INSTRUMENT commands:
 * 1) There are commands `KNOWLEDGE`, `ACTION` and `INSTRUMENT` used in the pipeline head, they just define the knowledge, action or instrument as single line after the command
 *    - KNOWLEDGE Look at https://en.wikipedia.org/wiki/Artificial_intelligence
 * 2) `KNOWLEDGE TEMPLATE` which has short form `KNOWLEDGE` is used in the template, does not refer the line itself, but the content of the template
 *   - KNOWLEDGE TEMPLATE
 *
 *   ```
 *   Look at https://en.wikipedia.org/wiki/Artificial_intelligence
 *   ```
 */
