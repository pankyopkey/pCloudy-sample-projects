import { type Dispatcher } from 'undici';
import { WebDriverRequest } from './request.js';
import type { RequestOptions } from './types.js';
export declare const SESSION_DISPATCHERS: Map<string, Dispatcher>;
/**
 * Node implementation of WebDriverRequest using undici fetch
 */
export declare class FetchRequest extends WebDriverRequest {
    fetch(url: URL, opts: RequestInit): Promise<Response>;
    private getDispatcher;
    private cleanupSessionDispatcher;
    createOptions(options: RequestOptions, sessionId?: string, isBrowser?: boolean): Promise<{
        url: URL;
        requestOptions: RequestInit;
    }>;
}
//# sourceMappingURL=node.d.ts.map