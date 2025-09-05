import { WebDriverRequest } from './request.js';
/**
 * Cross platform implementation of a fetch based request using native fetch
 */
export declare class FetchRequest extends WebDriverRequest {
    fetch(url: URL, opts: RequestInit): Promise<Response>;
}
//# sourceMappingURL=web.d.ts.map