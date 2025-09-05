import type { Services } from '@wdio/types';
/**
 * initialize WebdriverIO compliant plugins like reporter or services in the following way:
 * 1. if package name is scoped (starts with "@"), require scoped package name
 * 2. otherwise try to require "@wdio/<name>-<type>"
 * 3. otherwise try to require "wdio-<name>-<type>"
 */
export default function initializePlugin(name: string, type?: string): Promise<Services.ServicePlugin | Services.RunnerPlugin>;
//# sourceMappingURL=initializePlugin.d.ts.map