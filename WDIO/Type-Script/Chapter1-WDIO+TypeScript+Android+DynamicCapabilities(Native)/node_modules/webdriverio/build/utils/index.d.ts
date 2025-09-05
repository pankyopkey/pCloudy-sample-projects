import { type remote } from 'webdriver';
import type { ElementReference } from '@wdio/protocols';
import { type ShadowRootManager } from '../session/shadowRoot.js';
import type { Selector, ParsedCSSValue, CustomLocatorReturnValue } from '../types.js';
declare global {
    interface Window {
        __wdio_element: Record<string, HTMLElement>;
    }
}
/**
 * enhances objects with element commands
 */
export declare const getPrototype: (scope: "browser" | "element") => Record<string, PropertyDescriptor>;
/**
 * get element id from WebDriver response
 * @param  {?Object|undefined} res         body object from response or null
 * @return {?string}   element id or null if element couldn't be found
 */
export declare const getElementFromResponse: (res?: ElementReference) => string | null;
/**
 * parse css values to a better format
 * @param  {string} cssPropertyValue result of WebDriver call
 * @param  {string} cssProperty      name of css property to parse
 * @return {object}                  parsed css property
 */
export declare function parseCSS(cssPropertyValue: string, cssProperty?: string): ParsedCSSValue;
/**
 * check for unicode character or split string into literals
 * @param  {string} value  text
 * @return {Array}         set of characters or unicode symbols
 */
export declare function checkUnicode(value: string): string[];
export declare function isElement(o: Selector): boolean | "";
export declare function isStaleElementError(err: Error): boolean;
/**
 * handle promise result (resolved or rejected promises)
 * @param handle browsing context
 * @param shadowRootManager instance of ShadowRootManager
 * @param shadowRootId shadow root id that was inspected
 * @returns a function to handle the result of a shadow root inspection
 */
export declare function elementPromiseHandler<T extends object>(handle: string, shadowRootManager: ShadowRootManager, shadowRootId?: string): (el: T | Error) => T | undefined;
export declare function transformClassicToBidiSelector(using: string, value: string): remote.BrowsingContextCssLocator | remote.BrowsingContextXPathLocator | remote.BrowsingContextInnerTextLocator;
/**
 * Parallel look up of a selector within multiple shadow roots
 * @param this WebdriverIO Browser or Element instance
 * @param selector selector to look up
 * @param isMulti set to true if you call from `$$` command
 * @returns a list of shadow root ids with their corresponding matches or undefined if not found
 */
export declare function findDeepElement(this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector): Promise<ElementReference | undefined>;
/**
 * Parallel look up of a selector within multiple shadow roots
 * @param this WebdriverIO Browser or Element instance
 * @param selector selector to look up
 * @param isMulti set to true if you call from `$$` command
 * @returns a list of shadow root ids with their corresponding matches or undefined if not found
 */
export declare function findDeepElements(this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector): Promise<ElementReference[]>;
/**
 * logic to find an element
 * Note: the order of if statements matters
 */
export declare function findElement(this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector): Promise<ElementReference | Error | undefined>;
/**
 * logic to find a elements
 */
export declare function findElements(this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector): Promise<ElementReference[]>;
/**
 * Strip element object and return w3c and jsonwp compatible keys
 */
export declare function verifyArgsAndStripIfElement(args: unknown): unknown;
/**
 * getElementRect
 */
export declare function getElementRect(scope: WebdriverIO.Element): Promise<import("@wdio/protocols").RectReturn>;
/**
 * check if urls are valid and fix them if necessary
 * @param  {string}  url                url to navigate to
 * @param  {Boolean} [retryCheck=false] true if an url was already check and still failed with fix applied
 * @return {string}                     fixed url
 */
export declare function validateUrl(url: string, origError?: Error): string;
export declare function hasElementId(element: WebdriverIO.Element): Promise<boolean>;
export declare function addLocatorStrategyHandler(scope: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser): (name: string, func: (selector: string, root?: HTMLElement) => CustomLocatorReturnValue) => void;
/**
 * Enhance elements array with data required to refetch it
 * @param   {object[]}          elements    elements
 * @param   {object}            parent      element or browser
 * @param   {string|Function}   selector    string or function, or strategy name for `custom$$`
 * @param   {string}            foundWith   name of the command elements were found with, ex `$$`, `react$$`, etc
 * @param   {Array}             props       additional properties required to fetch elements again
 * @returns {object[]}  elements
 */
export declare const enhanceElementsArray: (elements: WebdriverIO.Element[], parent: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector | ElementReference[] | WebdriverIO.Element[], foundWith?: string, props?: unknown[]) => WebdriverIO.ElementArray;
/**
 * is protocol stub
 * @param {string} automationProtocol
 */
export declare const isStub: (automationProtocol?: string) => automationProtocol is "./protocol-stub.js";
/**
 * compare if an object (`base`) contains the same values as another object (`match`)
 * @param {object} base  object to compare to
 * @param {object} match object that needs to match thebase
 */
export declare const containsHeaderObject: (base: Record<string, string>, match: Record<string, string>) => boolean;
export declare function createFunctionDeclarationFromString(userScript: Function | string): string;
//# sourceMappingURL=index.d.ts.map