import type { Command } from './types/Command';
import type { CommandParser } from './types/CommandParser';
/**
 * Gets the parser for the command
 *
 * @returns the parser for the command
 * @throws {UnexpectedError} if the parser is not found
 *
 * @private within the pipelineStringToJson
 */
export declare function getParserForCommand<TCommand extends Command>(command: TCommand): CommandParser<TCommand>;
