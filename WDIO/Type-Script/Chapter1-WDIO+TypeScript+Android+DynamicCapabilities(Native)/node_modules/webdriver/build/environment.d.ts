import type WebSocket from 'ws';
import type { Options } from '@wdio/types';
import type { BrowserSocket } from './bidi/socket.js';
import type { FetchRequest } from './request/web.js';
/**
 * @internal
 */
export declare const isNode: boolean;
export interface EnvironmentVariables {
    WEBDRIVER_CACHE_DIR?: string;
    WDIO_LOG_LEVEL?: Options.WebDriverLogTypes;
    PROXY_URL?: string;
    NO_PROXY?: string[];
    WDIO_WORKER_ID?: string;
    WDIO_UNIT_TESTS?: string;
}
export interface EnvironmentDependencies {
    Request: typeof FetchRequest;
    Socket: typeof BrowserSocket;
    createBidiConnection: (wsUrl?: string, options?: WebSocket.ClientOptions) => Promise<WebSocket | undefined>;
    killDriverProcess: (capabilities: WebdriverIO.Capabilities, shutdownDriver: boolean) => void;
    variables: EnvironmentVariables;
}
/**
 * Holder for environment dependencies. These dependencies cannot
 * be used during the module instantiation.
 */
export declare const environment: {
    value: EnvironmentDependencies;
};
//# sourceMappingURL=environment.d.ts.map