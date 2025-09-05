import type { Options } from '@wdio/types';
import type { ProtocolCommands } from '@wdio/protocols';
import type { BrowserCommandsType, WebdriverIOEventMap } from './types.js';
type EventEmitter = (args: unknown) => void;
/**
 * Multiremote class
 */
export default class MultiRemote {
    instances: Record<string, WebdriverIO.Browser>;
    baseInstance?: MultiRemoteDriver;
    sessionId?: string;
    /**
     * add instance to multibrowser instance
     */
    addInstance(browserName: string, client: WebdriverIO.Browser): Promise<WebdriverIO.Browser>;
    /**
     * modifier for multibrowser instance
     */
    modifier(wrapperClient: {
        options: Options.WebdriverIO;
        commandList: (keyof (ProtocolCommands & BrowserCommandsType) & 'getInstance')[];
    }): any;
    /**
     * helper method to generate element objects from results, so that we can call, e.g.
     *
     * ```
     * const elem = $('#elem')
     * elem.getHTML()
     * ```
     *
     * or in case multiremote is used
     *
     * ```
     * const elems = $$('div')
     * elems[0].getHTML()
     * ```
     */
    static elementWrapper(instances: Record<string, WebdriverIO.Browser>, result: unknown, propertiesObject: Record<string, PropertyDescriptor>, scope: MultiRemote): WebdriverIO.MultiRemoteElement;
    /**
     * handle commands for multiremote instances
     */
    commandWrapper(commandName: keyof (ProtocolCommands & BrowserCommandsType) & 'getInstance'): ((this: Record<string, WebdriverIO.Browser | WebdriverIO.Element>, browserName: string) => WebdriverIO.Browser | WebdriverIO.Element) | ((...args: unknown[]) => Promise<unknown>);
}
/**
 * event listener class that propagates events to sub drivers
 */
export declare class MultiRemoteDriver {
    instances: string[];
    isMultiremote: true;
    __propertiesObject__: Record<string, PropertyDescriptor>;
    constructor(instances: Record<string, WebdriverIO.Browser>, propertiesObject: Record<string, PropertyDescriptor>);
    on(this: WebdriverIO.MultiRemoteBrowser, eventName: keyof WebdriverIOEventMap, emitter: EventEmitter): undefined;
    once(this: WebdriverIO.MultiRemoteBrowser, eventName: keyof WebdriverIOEventMap, emitter: EventEmitter): undefined;
    emit(this: WebdriverIO.MultiRemoteBrowser, eventName: keyof WebdriverIOEventMap, emitter: EventEmitter): boolean;
    eventNames(this: WebdriverIO.MultiRemoteBrowser): (string | symbol)[][];
    getMaxListeners(this: WebdriverIO.MultiRemoteBrowser): number[];
    listenerCount(this: WebdriverIO.MultiRemoteBrowser, eventName: string): number[];
    listeners(this: WebdriverIO.MultiRemoteBrowser, eventName: string): Function[];
    removeListener(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): undefined;
    removeAllListeners(this: WebdriverIO.MultiRemoteBrowser, eventName: string): undefined;
}
export {};
//# sourceMappingURL=multiremote.d.ts.map