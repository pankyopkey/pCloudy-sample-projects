import type { string_markdown } from '../../types/typeAliases';
/**
 * Creates a message with all registered LLM tools
 *
 * Note: This function is used to create a (error) message when there is no constructor for some LLM provider
 *
 * @private internal function of `createLlmToolsFromConfiguration` and `createLlmToolsFromEnv`
 */
export declare function $registeredLlmToolsMessage(): string_markdown;
