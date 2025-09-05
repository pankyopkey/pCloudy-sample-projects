import { type local } from 'webdriver';
import { SessionManager } from './session.js';
export declare function getShadowRootManager(browser: WebdriverIO.Browser): ShadowRootManager;
/**
 * This class is responsible for managing shadow roots and their elements.
 * It allows to do deep element lookups and pierce into shadow DOMs across
 * all components of a page.
 */
export declare class ShadowRootManager extends SessionManager {
    #private;
    constructor(browser: WebdriverIO.Browser);
    removeListeners(): void;
    initialize(): Promise<boolean>;
    /**
     * check if we are within a frame
     * @returns {boolean} true if we are within a frame
     */
    isWithinFrame(): boolean;
    /**
     * capture shadow root elements propagated through console.debug
     */
    handleLogEntry(logEntry: local.LogEntry): boolean | void;
    getShadowElementsByContextId(contextId: string, scope?: string): string[];
    getShadowElementPairsByContextId(contextId: string, scope?: string): [string, string | undefined][];
    getShadowRootModeById(contextId: string, element: string): ShadowRootMode | undefined;
    deleteShadowRoot(element: string, contextId: string): boolean | undefined;
}
export declare class ShadowRootTree {
    element: string;
    shadowRoot?: string;
    mode?: ShadowRootMode;
    children: Set<ShadowRootTree>;
    constructor(element: string, shadowRoot?: string, mode?: ShadowRootMode);
    /**
     * Attach new shadow element to tree
     */
    addShadowElement(tree: ShadowRootTree): void;
    /**
     * Attach new shadow element to tree of sub tree
     * @param scope {string} shadow element id of tree to attach new element to
     * @param element {string} element id
     * @param shadowRoot {string} shadow root id
     */
    addShadowElement(scope: string, tree: ShadowRootTree): void;
    find(element: string): ShadowRootTree | undefined;
    findByShadowId(shadowRoot: string): ShadowRootTree | undefined;
    getAllLookupScopes(): string[];
    flat(): ShadowRootTree[];
    remove(element: string): boolean;
}
//# sourceMappingURL=shadowRoot.d.ts.map