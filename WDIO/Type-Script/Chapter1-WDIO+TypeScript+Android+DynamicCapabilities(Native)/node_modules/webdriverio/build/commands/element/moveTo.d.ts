import type { MoveToOptions } from '../../types.js';
/**
 *
 * Move the mouse by an offset of the specified element. If no element is specified,
 * the move is relative to the current mouse cursor. If an element is provided but
 * no offset, the mouse will be moved to the center of the element. If the element
 * is not visible, it will be scrolled into view.
 *
 * @param {MoveToOptions=} options          moveTo command options
 * @param {Number=}        options.xOffset  X offset to move to, relative to the center of the element. If not specified, the mouse will move to the center of the element.
 * @param {Number=}        options.yOffset  Y offset to move to, relative to the center of the element. If not specified, the mouse will move to the center of the element.
 *
 * @see  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidmoveto
 * @type protocol
 */
export declare function moveTo(this: WebdriverIO.Element, { xOffset, yOffset }?: MoveToOptions): Promise<void>;
//# sourceMappingURL=moveTo.d.ts.map