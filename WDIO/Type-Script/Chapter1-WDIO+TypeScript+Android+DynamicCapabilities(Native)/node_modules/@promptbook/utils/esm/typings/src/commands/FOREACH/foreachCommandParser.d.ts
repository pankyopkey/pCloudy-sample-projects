import type { PipelineTemplateCommandParser } from '../_common/types/CommandParser';
import type { ForeachCommand } from './ForeachCommand';
/**
 * Parses the foreach command
 *
 * Note: @@@ This command is used as foreach for new commands - it should NOT be used in any `.ptbk.md` file
 *
 * @see ./FOREACH-README.md for more details <- TODO: @@@ Write theese README files OR remove this link + add annotation here (to all commands)
 * @private within the commands folder
 */
export declare const foreachCommandParser: PipelineTemplateCommandParser<ForeachCommand>;
/**
 * TODO: [🍭] Make .ptbk.md file with examples of the FOREACH with wrong parsing and logic
 */
