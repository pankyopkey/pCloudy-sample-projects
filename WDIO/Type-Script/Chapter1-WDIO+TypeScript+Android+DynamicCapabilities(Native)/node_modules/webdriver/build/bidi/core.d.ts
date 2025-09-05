import type { ClientOptions, RawData, WebSocket } from 'ws';
import type { CommandData } from './remoteTypes.js';
import type { CommandResponse } from './localTypes.js';
import type { Client } from '../types.js';
export declare class BidiCore {
    #private;
    client: Client | undefined;
    /**
     * @private
     */
    private _isConnected;
    constructor(webSocketUrl: string, opts?: ClientOptions);
    /**
     * We initiate the Bidi instance before a WebdriverIO instance is created.
     * In order to emit Bidi events we have to attach the WebdriverIO instance
     * to the Bidi instance afterwards.
     */
    attachClient(client: Client): void;
    connect(): Promise<boolean>;
    close(): void;
    reconnect(webSocketUrl: string, opts?: ClientOptions): Promise<boolean>;
    /**
     * Helper function that allows to wait until Bidi connection establishes
     * @returns a promise that resolves once the connection to WebDriver Bidi protocol was established
     */
    waitForConnected(): Promise<boolean>;
    get socket(): WebSocket | undefined;
    get isConnected(): boolean;
    /**
     * for testing purposes only
     * @internal
     */
    get __handleResponse(): (data: RawData) => void;
    send(params: Omit<CommandData, 'id'>): Promise<CommandResponse>;
    sendAsync(params: Omit<CommandData, 'id'>): number;
}
export declare function parseBidiCommand(params: Omit<CommandData, 'id'>): string[];
//# sourceMappingURL=core.d.ts.map