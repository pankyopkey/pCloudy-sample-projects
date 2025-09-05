/**
 *
 * Returns the next sibling element of the selected DOM-element.
 *
 * <example>
    :index.html
    <div class="parent">
        <p>Sibling One</p>
        <p>Sibling Two</p>
        <p>Sibling Three</p>
    </div>
    :nextElement.js
    it('should get text from next sibling element', async () => {
        const elem = await $$('p');
        const nextElement = await elem[1].nextElement()
        console.log(await nextElement.getText()); // outputs: "Sibling Three"
    });
 * </example>
 *
 * @alias element.nextElement
 * @return {WebdriverIO.Element}
 * @type utility
 */
export declare function nextElement(this: WebdriverIO.Element): import("../../types.js").ChainablePromiseElement;
//# sourceMappingURL=nextElement.d.ts.map