import { type CommandEndpoint } from '@wdio/protocols';
import type { WebDriverResponse } from './request/types.js';
import type { BaseClient, BidiResponses } from './types.js';
export default function (method: string, endpointUri: string, commandInfo: CommandEndpoint, doubleEncodeVariables?: boolean): (this: BaseClient, ...unmaskedArgs: unknown[]) => Promise<WebDriverResponse | BidiResponses | void>;
//# sourceMappingURL=command.d.ts.map