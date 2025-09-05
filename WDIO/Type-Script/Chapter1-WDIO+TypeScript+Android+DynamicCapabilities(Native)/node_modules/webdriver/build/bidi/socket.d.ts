/**
 * A WebSocket implementation that wraps the browser native WebSocket
 * interface and exposes a similar interface to the Node.js WebSocket
 */
export declare class BrowserSocket {
    #private;
    constructor(wsUrl: string, _opts: unknown);
    handleMessage(event: MessageEvent): void;
    send(data: string): void;
    on(event: string, callback: Callback): this;
    off(_event: string, callback: Callback): this;
    close(): void;
}
type Callback = (data: unknown, reason?: unknown) => void;
export {};
//# sourceMappingURL=socket.d.ts.map