import { type local } from 'webdriver';
import { SessionManager } from './session.js';
export declare function getDialogManager(browser: WebdriverIO.Browser): DialogManager;
/**
 * This class is responsible for managing shadow roots and their elements.
 * It allows to do deep element lookups and pierce into shadow DOMs across
 * all components of a page.
 */
export declare class DialogManager extends SessionManager {
    #private;
    constructor(browser: WebdriverIO.Browser);
    removeListeners(): void;
    initialize(): Promise<boolean>;
}
export declare class Dialog {
    #private;
    constructor(event: local.BrowsingContextUserPromptOpenedParameters, browser: WebdriverIO.Browser);
    message(): string;
    defaultValue(): string | undefined;
    type(): local.BrowsingContextUserPromptType;
    /**
     * Returns when the dialog has been accepted.
     *
     * @alias dialog.accept
     * @param {string=} promptText  A text to enter into prompt. Does not cause any effects if the dialog's type is not prompt.
     * @returns {Promise<void>}
     */
    accept(userText?: string): Promise<void>;
    dismiss(): Promise<void>;
}
//# sourceMappingURL=dialog.d.ts.map