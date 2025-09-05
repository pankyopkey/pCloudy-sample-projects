import type { local, remote } from 'webdriver';
import type { RequestWithOptions, RespondWithOptions } from './types.js';
type Overwrite<T> = Omit<T extends RequestWithOptions ? remote.NetworkContinueRequestParameters : remote.NetworkContinueResponseParameters, 'request'>;
/**
 * parse request or response overwrites to make it compatible with Bidis protocol
 * @param overwrite request or response overwrite
 * @returns object to pass to the protocol
 */
export declare function parseOverwrite<T extends RequestWithOptions | RespondWithOptions>(overwrite: T, request: local.NetworkBeforeRequestSentParameters | local.NetworkResponseCompletedParameters): Overwrite<T>;
export declare function getPatternParam(pattern: URLPattern, key: keyof Omit<remote.NetworkUrlPatternPattern, 'type'>): string | undefined;
export {};
//# sourceMappingURL=utils.d.ts.map