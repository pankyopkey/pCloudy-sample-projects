import type { PipelineHeadCommandParser } from '../_common/types/CommandParser';
import type { InstrumentCommand } from './InstrumentCommand';
/**
 * Parses the instrument command
 *
 * @see ./INSTRUMENT-README.md for more details
 * @private within the commands folder
 */
export declare const instrumentCommandParser: PipelineHeadCommandParser<InstrumentCommand>;
/**
 * Note: [⛱] There are two types of INSTRUMENT commands *...(read more in [⛱])*
 */
