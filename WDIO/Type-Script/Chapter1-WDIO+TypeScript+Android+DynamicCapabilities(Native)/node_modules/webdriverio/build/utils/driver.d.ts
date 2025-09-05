import type { Automation, Capabilities } from '@wdio/types';
interface ProtocolDriver {
    Driver: Automation.Driver<Capabilities.RemoteConfig>;
    options: Capabilities.WebdriverIOConfig;
}
/**
 * get protocol driver
 * @param  {Capabilities.WebdriverIOConfig} options  remote options
 * @return {Automation.Driver}      automation driver
 */
export declare function getProtocolDriver(options: Capabilities.WebdriverIOConfig): Promise<ProtocolDriver>;
export {};
//# sourceMappingURL=driver.d.ts.map