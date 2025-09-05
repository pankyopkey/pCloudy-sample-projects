/**
 * get HTML of all shadow roots
 *
 * @param  {string}  element               element to get HTML from
 * @param  {Boolean} includeSelectorTag    if true, selector tag gets included (uses outerHTML)
 * @param  {Object}  shadowElementIdsFound list of shadow root ids we want to look up in the next iteration
 * @return {Object}                        html source and list of shadow root ids found
 */
export default function getHTMLShadow(element: HTMLElement | ShadowRoot, includeSelectorTag: boolean, shadowElementIds?: [string, HTMLElement, HTMLElement | undefined][]): {
    html: string;
    shadowElementHTML: ({
        id: string;
        html: string;
        styles?: undefined;
    } | {
        id: string;
        html: string;
        styles: string[];
    })[];
};
//# sourceMappingURL=getHTMLShadow.d.ts.map