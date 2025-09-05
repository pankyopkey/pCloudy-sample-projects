import type { CommonExecutionToolsOptions } from '../../../execution/CommonExecutionToolsOptions';
import type { UserInterfaceTools } from '../../../execution/UserInterfaceTools';
import type { UserInterfaceToolsPromptDialogOptions } from '../../../execution/UserInterfaceTools';
/**
 * Wrapper around `window.prompt` synchronous function that interacts with the user via browser prompt
 *
 * Warning: It is used for testing and mocking
 *          **NOT intended to use in the production** due to its synchronous nature.
 *
 * @public exported from `@promptbook/browser`
 */
export declare class SimplePromptInterfaceTools implements UserInterfaceTools {
    private readonly options;
    constructor(options?: CommonExecutionToolsOptions);
    /**
     * Trigger window.DIALOG TEMPLATE
     */
    promptDialog(options: UserInterfaceToolsPromptDialogOptions): Promise<string>;
}
/**
 * Note: [🔵] This code should never be published outside of `@promptbook/browser`
 */
