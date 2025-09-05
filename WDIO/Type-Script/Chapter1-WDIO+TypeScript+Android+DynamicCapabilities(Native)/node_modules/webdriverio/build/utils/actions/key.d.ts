import type { BaseActionParams } from './base.js';
import BaseAction from './base.js';
export default class KeyAction extends BaseAction {
    #private;
    constructor(instance: WebdriverIO.Browser, params?: BaseActionParams);
    /**
     * Generates a key up action.
     * @param value key value
     */
    up(value: string): this;
    /**
     * Generates a key down action.
     * @param value key value
     */
    down(value: string): this;
}
//# sourceMappingURL=key.d.ts.map