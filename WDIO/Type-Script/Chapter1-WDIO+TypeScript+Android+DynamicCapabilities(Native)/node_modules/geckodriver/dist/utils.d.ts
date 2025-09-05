import { type RequestInit } from 'node-fetch';
import type { GeckodriverParameters } from './types.js';
export declare function hasAccess(filePath: string): Promise<boolean>;
export declare function getDownloadUrl(version: string): string;
export declare function parseParams(params: GeckodriverParameters): string[];
export declare function retryFetch(url: string, opts: RequestInit, retry?: number): Promise<import("node-fetch").Response>;
//# sourceMappingURL=utils.d.ts.map