import { AzureOpenAiExecutionTools } from './AzureOpenAiExecutionTools';
import type { AzureOpenAiExecutionToolsOptions } from './AzureOpenAiExecutionToolsOptions';
/**
 * Execution Tools for calling Azure OpenAI API
 *
 * @public exported from `@promptbook/azure-openai`
 */
export declare const createAzureOpenAiExecutionTools: ((options: AzureOpenAiExecutionToolsOptions) => AzureOpenAiExecutionTools) & {
    packageName: string;
    className: string;
};
/**
 * TODO: [🦺] Is there some way how to put `packageName` and `className` on top and function definition on bottom?
 * TODO: [🎶] Naming "constructor" vs "creator" vs "factory"
 */
