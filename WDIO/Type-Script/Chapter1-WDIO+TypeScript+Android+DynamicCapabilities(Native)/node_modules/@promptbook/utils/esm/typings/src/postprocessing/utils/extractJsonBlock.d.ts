import type { string_json } from '../../types/typeAliases';
import type { string_markdown } from '../../types/typeAliases';
import type { really_unknown } from '../../utils/organization/really_unknown';
/**
 * Extracts  extracts exactly one valid JSON code block
 *
 * - When given string is a valid JSON as it is, it just returns it
 * - When there is no JSON code block the function throws a `ParseError`
 * - When there are multiple JSON code blocks the function throws a `ParseError`
 *
 * Note: It is not important if marked as ```json BUT if it is VALID JSON
 * Note: There are multiple simmilar function:
 * - `extractBlock` just extracts the content of the code block which is also used as build-in function for postprocessing
 * - `extractJsonBlock` extracts exactly one valid JSON code block
 * - `extractOneBlockFromMarkdown` extracts exactly one code block with language of the code block
 * - `extractAllBlocksFromMarkdown` extracts all code blocks with language of the code block
 *
 * @public exported from `@promptbook/markdown-utils`
 * @throws {ParseError} if there is no valid JSON block in the markdown
 */
export declare function extractJsonBlock(markdown: string_markdown): string_json<really_unknown>;
/**
 * TODO: Add some auto-healing logic + extract YAML, JSON5, TOML, etc.
 * TODO: [🏢] Make this logic part of `JsonFormatDefinition` or `isValidJsonString`
 */
