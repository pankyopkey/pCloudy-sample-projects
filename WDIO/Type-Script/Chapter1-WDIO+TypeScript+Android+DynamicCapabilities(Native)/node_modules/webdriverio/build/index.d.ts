import type { Capabilities } from '@wdio/types';
import type * as WebDriverTypes from 'webdriver';
import SevereServiceErrorImport from './utils/SevereServiceError.js';
import type { AttachOptions } from './types.js';
export * from './types.js';
export declare const Key: {
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
export declare const SevereServiceError: typeof SevereServiceErrorImport;
/**
 * A method to create a new session with WebdriverIO.
 *
 * <b>
 * NOTE: If you hit "error TS2694: Namespace 'global.WebdriverIO' has no exported member 'Browser'" when using typescript,
 * add "@wdio/globals/types" into tsconfig.json's "types" array will solve it: <code> { "compilerOptions": { "types": ["@wdio/globals/types"] } } </code>
 * </b>
 *
 * @param params Options to create the session with
 * @param remoteModifier Modifier function to change the monad object
 * @return browser object with sessionId
 * @see <a href="https://webdriver.io/docs/typescript">Typescript setup</a>
 */
export declare const remote: (params: Capabilities.WebdriverIOConfig, remoteModifier?: (client: WebDriverTypes.Client, options: Capabilities.WebdriverIOConfig) => WebDriverTypes.Client) => Promise<WebdriverIO.Browser>;
export declare const attach: (attachOptions: AttachOptions) => Promise<WebdriverIO.Browser>;
/**
 * WebdriverIO allows you to run multiple automated sessions in a single test.
 * This is handy when you're testing features that require multiple users (for example, chat or WebRTC applications).
 *
 * Instead of creating a couple of remote instances where you need to execute common commands like newSession() or url() on each instance,
 * you can simply create a multiremote instance and control all browsers at the same time.
 *
 * <b>
 * NOTE: Multiremote is not meant to execute all your tests in parallel.
 * It is intended to help coordinate multiple browsers and/or mobile devices for special integration tests (e.g. chat applications).
 * </b>
 *
 * @param params capabilities to choose desired devices.
 * @param automationProtocol
 * @return All remote instances, the first result represents the capability defined first in the capability object,
 * the second result the second capability and so on.
 *
 * @see <a href="https://webdriver.io/docs/multiremote">External document and example usage</a>.
 */
export declare const multiremote: (params: Capabilities.RequestedMultiremoteCapabilities, { automationProtocol }?: {
    automationProtocol?: string;
}) => Promise<WebdriverIO.MultiRemoteBrowser>;
//# sourceMappingURL=index.d.ts.map