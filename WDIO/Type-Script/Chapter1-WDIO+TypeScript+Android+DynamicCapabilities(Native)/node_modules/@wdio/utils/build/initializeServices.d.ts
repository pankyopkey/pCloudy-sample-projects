import type { Services, Capabilities } from '@wdio/types';
/**
 * initialize service for launcher process
 * @param  {Object}   config  wdio config
 * @param  {Object[]} caps    list of capabilities
 * @return {Object}           containing a list of launcher services as well
 *                            as a list of services that don't need to be
 *                            required in the worker
 */
export declare function initializeLauncherService(config: Omit<WebdriverIO.Config, 'capabilities' | keyof Services.HookFunctions>, caps: Capabilities.TestrunnerCapabilities): Promise<{
    ignoredWorkerServices: string[];
    launcherServices: Services.ServiceInstance[];
}>;
/**
 * initialize services for worker instance
 * @param  {Object} config                 wdio config
 * @param  {Object} caps                   worker capabilities
 * @param  {object} ignoredWorkerServices  list of services that don't need to be required in a worker
 *                                         as they don't export a service for it
 * @return {Object[]}                      list if worker initiated worker services
 */
export declare function initializeWorkerService(config: WebdriverIO.Config, caps: WebdriverIO.Capabilities, ignoredWorkerServices?: string[]): Promise<Services.ServiceInstance[]>;
//# sourceMappingURL=initializeServices.d.ts.map