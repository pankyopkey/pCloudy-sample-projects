import WebSocket, { type ClientOptions } from 'ws';
export declare function createBidiConnection(webSocketUrl: string, options?: ClientOptions): Promise<WebSocket | undefined>;
/**
 * Resolve hostnames to IPv4 and IPv6 addresses
 * @returns list of websocket urls to try
 * @see https://github.com/webdriverio/webdriverio/issues/14039
 */
export declare function listWebsocketCandidateUrls(webSocketUrl: string): Promise<string[]>;
/**
 * Connect to a websocket
 * @param candidateUrls - list of websocket urls to try
 * @returns true if the connection was successful
 */
export declare function connectWebsocket(candidateUrls: string[], options?: ClientOptions): Promise<WebSocket | undefined>;
//# sourceMappingURL=bidi.d.ts.map