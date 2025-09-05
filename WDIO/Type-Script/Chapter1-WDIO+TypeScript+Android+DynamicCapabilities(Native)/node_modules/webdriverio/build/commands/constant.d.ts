import type { TouchAction, TouchActions } from '../types.js';
export declare const SCRIPT_PREFIX = "/* __wdio script__ */";
export declare const SCRIPT_SUFFIX = "/* __wdio script end__ */";
export declare const resqScript: string;
interface FormattedTouchAction extends Omit<TouchAction, 'element'> {
    element?: string;
}
interface FormattedActions {
    action: string;
    options?: FormattedTouchAction;
}
export declare const formatArgs: (scope: WebdriverIO.Browser | WebdriverIO.Element, actions: TouchActions[]) => FormattedActions[];
/**
 * Make sure action has proper options before sending command to Appium.
 *
 * @param  {Object} params  touchAction parameters
 * @return null
 */
export declare const validateParameters: (params: FormattedActions) => void;
export declare const touchAction: (this: WebdriverIO.Browser | WebdriverIO.Element, actions: TouchActions) => Promise<void>;
export {};
//# sourceMappingURL=constant.d.ts.map