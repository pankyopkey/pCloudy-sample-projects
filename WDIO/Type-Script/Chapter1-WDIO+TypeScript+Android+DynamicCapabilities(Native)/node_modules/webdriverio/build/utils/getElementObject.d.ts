import type { ElementReference } from '@wdio/protocols';
import type { Selector, ExtendedElementReference } from '../types.js';
interface GetElementProps {
    isReactElement?: boolean;
    isShadowElement?: boolean;
}
interface WebDriverErrorResponse {
    error: string;
    message: string;
    stacktrace: string;
}
declare class WebDriverError extends Error {
    constructor(obj: Error | WebDriverErrorResponse);
}
/**
 * transforms a findElement response into a WDIO element
 * @param  {string} selector  selector that was used to query the element
 * @param  {Object} res       findElement response
 * @return {Object}           WDIO element object
 */
export declare function getElement(this: WebdriverIO.Browser | WebdriverIO.Element, selector?: Selector, res?: ElementReference | ExtendedElementReference | Error, props?: GetElementProps): WebdriverIO.Element;
/**
 * transforms a findElements response into an array of WDIO elements
 * @param  {string} selector  selector that was used to query the element
 * @param  {Object} res       findElements response
 * @return {Array}            array of WDIO elements
 */
export declare const getElements: (this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector | ElementReference[] | WebdriverIO.Element[], elemResponse: (ElementReference | ExtendedElementReference | Error | WebDriverError)[], props?: GetElementProps) => WebdriverIO.Element[];
export {};
//# sourceMappingURL=getElementObject.d.ts.map