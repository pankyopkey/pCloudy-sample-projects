import type { ElementReference } from '@wdio/protocols';
import type { BaseActionParams } from './base.js';
import BaseAction from './base.js';
import type { ChainablePromiseElement } from '../../types.js';
export declare const buttonValue: readonly [0, 1, 2, "left", "middle", "right"];
export type ButtonNames = 'left' | 'middle' | 'right';
export type Button = 0 | 1 | 2;
export type Origin = 'pointer' | 'viewport';
interface PointerActionUpParams {
    /**
     * The button to press (e.g. 0 for left, 1 for middle or 2 for right)
     * @default 0
     */
    button: Button | ButtonNames;
}
declare const PARAM_DEFAULTS: {
    width: number;
    height: number;
    pressure: number;
    tangentialPressure: number;
    tiltX: number;
    tiltY: number;
    twist: number;
    altitudeAngle: number;
    azimuthAngle: number;
    /**
     * The button to press (e.g. 0 for left, 1 for middle or 2 for right)
     * @default 0
     */
    button: Button | ButtonNames;
};
declare const MOVE_PARAM_DEFAULTS: {
    x: number;
    y: number;
    duration: number;
    origin: (Origin | ElementReference | ChainablePromiseElement | WebdriverIO.Element);
};
type PointerActionParams = Partial<typeof PARAM_DEFAULTS> & Partial<PointerActionUpParams>;
type PointerActionMoveParams = Partial<typeof MOVE_PARAM_DEFAULTS> & PointerActionParams;
export default class PointerAction extends BaseAction {
    constructor(instance: WebdriverIO.Browser, params?: BaseActionParams);
    /**
     * Creates an action for moving the pointer `x` and `y` pixels from the specified
     * `origin`. The `origin` may be defined as the pointers current position (e.g. "pointer"),
     * the viewport (e.g. "viewport") or the center of a specific element.
     * @param params PointerActionMoveParams
     */
    move(params: PointerActionMoveParams): PointerAction;
    move(x: number, y: number): PointerAction;
    /**
     * Creates an action to release a single key.
     * @param params PointerActionUpParams
     */
    up(button?: Button): PointerAction;
    up(button?: ButtonNames): PointerAction;
    up(params?: PointerActionUpParams): PointerAction;
    /**
     * Creates an action to press a single key
     * @param params PointerActionParams
     */
    down(button?: Button): PointerAction;
    down(button?: ButtonNames): PointerAction;
    down(params?: PointerActionParams): PointerAction;
    /**
     * An action that cancels this pointer's current input.
     */
    cancel(): this;
}
export {};
//# sourceMappingURL=pointer.d.ts.map