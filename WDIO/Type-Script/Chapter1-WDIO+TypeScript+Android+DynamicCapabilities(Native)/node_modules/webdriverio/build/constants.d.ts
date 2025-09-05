import type { Options, Capabilities } from '@wdio/types';
import type { RestoreMap } from './types.js';
export declare const WDIO_DEFAULTS: Options.Definition<Capabilities.WebdriverIOConfig>;
export declare const W3C_SELECTOR_STRATEGIES: string[];
export declare const DRIVER_DEFAULT_ENDPOINT: {
    method: string;
    host: string;
    port: number;
    path: string;
};
export declare const FF_REMOTE_DEBUG_ARG = "-remote-debugging-port";
export declare const DEEP_SELECTOR = ">>>";
export declare const ARIA_SELECTOR = "aria/";
export declare const ERROR_REASON: string[];
/**
 * store all preload scripts in a map (per instance) so that we can easily remove them
 */
export declare const restoreFunctions: Map<WebdriverIO.Browser, RestoreMap>;
/**
 * Special Characters
 */
export declare const Key: {
    /**
     * Special control key that works cross browser for Mac, where it's the command key, and for
     * Windows or Linux, where it is the control key.
     */
    readonly Ctrl: "WDIO_CONTROL";
    readonly NULL: "";
    readonly Cancel: "";
    readonly Help: "";
    readonly Backspace: "";
    readonly Tab: "";
    readonly Clear: "";
    readonly Return: "";
    readonly Enter: "";
    readonly Shift: "";
    readonly Control: "";
    readonly Alt: "";
    readonly Pause: "";
    readonly Escape: "";
    readonly Space: "";
    readonly PageUp: "";
    readonly PageDown: "";
    readonly End: "";
    readonly Home: "";
    readonly ArrowLeft: "";
    readonly ArrowUp: "";
    readonly ArrowRight: "";
    readonly ArrowDown: "";
    readonly Insert: "";
    readonly Delete: "";
    readonly Semicolon: "";
    readonly Equals: "";
    readonly Numpad0: "";
    readonly Numpad1: "";
    readonly Numpad2: "";
    readonly Numpad3: "";
    readonly Numpad4: "";
    readonly Numpad5: "";
    readonly Numpad6: "";
    readonly Numpad7: "";
    readonly Numpad8: "";
    readonly Numpad9: "";
    readonly Multiply: "";
    readonly Add: "";
    readonly Separator: "";
    readonly Subtract: "";
    readonly Decimal: "";
    readonly Divide: "";
    readonly F1: "";
    readonly F2: "";
    readonly F3: "";
    readonly F4: "";
    readonly F5: "";
    readonly F6: "";
    readonly F7: "";
    readonly F8: "";
    readonly F9: "";
    readonly F10: "";
    readonly F11: "";
    readonly F12: "";
    readonly Command: "";
    readonly ZenkakuHankaku: "";
};
//# sourceMappingURL=constants.d.ts.map