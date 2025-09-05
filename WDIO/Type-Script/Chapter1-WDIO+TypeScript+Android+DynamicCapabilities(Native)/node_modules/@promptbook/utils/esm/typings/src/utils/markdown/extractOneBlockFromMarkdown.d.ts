import type { string_markdown } from '../../types/typeAliases';
import type { CodeBlock } from './extractAllBlocksFromMarkdown';
/**
 * Extracts exactly ONE code block from markdown.
 *
 * - When there are multiple or no code blocks the function throws a `ParseError`
 *
 * Note: There are multiple simmilar function:
 * - `extractBlock` just extracts the content of the code block which is also used as build-in function for postprocessing
 * - `extractJsonBlock` extracts exactly one valid JSON code block
 * - `extractOneBlockFromMarkdown` extracts exactly one code block with language of the code block
 * - `extractAllBlocksFromMarkdown` extracts all code blocks with language of the code block
 *
 * @param markdown any valid markdown
 * @returns code block with language and content
 * @public exported from `@promptbook/markdown-utils`
 * @throws {ParseError} if there is not exactly one code block in the markdown
 */
export declare function extractOneBlockFromMarkdown(markdown: string_markdown): CodeBlock;
/***
 * TODO: [🍓][🌻] Decide of this is internal utility, external util OR validator/postprocessor
 */
