import type { ElementReference } from '@wdio/protocols';
export type ActionType = 'key' | 'pointer' | 'wheel';
export type KeyActionType = 'mouse' | 'pen' | 'touch';
export interface ActionParameters {
    pointerType?: KeyActionType;
}
export interface BaseActionParams {
    id?: string;
    parameters?: ActionParameters;
}
interface Sequence {
    type: string;
    duration?: number;
    origin?: (ElementReference | WebdriverIO.Element | 'pointer' | 'viewport') & {
        then?: Function;
    };
    value?: string;
}
export default class BaseAction {
    #private;
    protected instance: WebdriverIO.Browser;
    protected sequence: Sequence[];
    constructor(instance: WebdriverIO.Browser, type: ActionType, params?: BaseActionParams);
    toJSON(): {
        id: string;
        type: ActionType;
        parameters: ActionParameters;
        actions: Sequence[];
    };
    /**
     * Inserts a pause action for the specified device, ensuring it idles for a tick.
     * @param duration idle time of tick
     */
    pause(duration: number): this;
    /**
     * Perform action sequence
     * @param skipRelease set to true if `releaseActions` command should not be invoked
     */
    perform(skipRelease?: boolean): Promise<void>;
}
export {};
//# sourceMappingURL=base.d.ts.map