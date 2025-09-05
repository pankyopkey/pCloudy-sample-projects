import { OpenAiExecutionTools } from './OpenAiExecutionTools';
import type { OpenAiExecutionToolsOptions } from './OpenAiExecutionToolsOptions';
/**
 * Execution Tools for calling OpenAI API
 *
 * @public exported from `@promptbook/openai`
 */
export declare const createOpenAiExecutionTools: ((options: OpenAiExecutionToolsOptions) => OpenAiExecutionTools) & {
    packageName: string;
    className: string;
};
/**
 * TODO: [🦺] Is there some way how to put `packageName` and `className` on top and function definition on bottom?
 * TODO: [🎶] Naming "constructor" vs "creator" vs "factory"
 */
