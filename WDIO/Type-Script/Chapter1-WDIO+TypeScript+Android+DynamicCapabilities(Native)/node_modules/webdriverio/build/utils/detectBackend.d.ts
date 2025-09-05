import type { Capabilities, Options } from '@wdio/types';
interface BackendConfigurations {
    port?: number;
    hostname?: string;
    user?: string;
    key?: string;
    protocol?: string;
    region?: Options.SauceRegions;
    path?: string;
    capabilities?: Capabilities.RequestedStandaloneCapabilities;
}
/**
 * helper to detect the Selenium backend according to given capabilities
 */
export default function detectBackend(options?: BackendConfigurations): {
    hostname: string | undefined;
    port: number | undefined;
    protocol: string | undefined;
    path: string | undefined;
};
export {};
//# sourceMappingURL=detectBackend.d.ts.map