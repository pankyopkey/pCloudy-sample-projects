import type { PipelineBothCommandParser } from '../_common/types/CommandParser';
import type { BoilerplateCommand } from './BoilerplateCommand';
/**
 * Parses the boilerplate command
 *
 * Note: @@@ This command is used as boilerplate for new commands - it should NOT be used in any `.ptbk.md` file
 *
 * @see ./BOILERPLATE-README.md for more details <- TODO: @@@ Write theese README files OR remove this link + add annotation here (to all commands)
 * @private within the commands folder
 */
export declare const boilerplateCommandParser: PipelineBothCommandParser<BoilerplateCommand>;
