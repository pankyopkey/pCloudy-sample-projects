import cp from 'node:child_process';
import find from './finder.js';
import { download as downloadDriver } from './install.js';
import { hasAccess, parseParams } from './utils.js';
import { DEFAULT_ALLOWED_ORIGINS, DEFAULT_ALLOWED_IPS, log } from './constants.js';
export async function start(params) {
    const { cacheDir, customEdgeDriverPath, ...startArgs } = params;
    let binaryFilePath = customEdgeDriverPath || process.env.EDGEDRIVER_PATH;
    if (!binaryFilePath) {
        binaryFilePath = await downloadDriver(params.edgeDriverVersion, cacheDir);
    }
    if (!(await hasAccess(binaryFilePath))) {
        throw new Error('Failed to access EdgeDriver, was it installed successfully?');
    }
    startArgs.allowedOrigins = startArgs.allowedOrigins || DEFAULT_ALLOWED_ORIGINS;
    startArgs.allowedIps = startArgs.allowedIps || DEFAULT_ALLOWED_IPS;
    const args = parseParams(startArgs);
    log.info(`Starting EdgeDriver at ${binaryFilePath} with params: ${args.join(' ')}`);
    return cp.spawn(binaryFilePath, args);
}
export const download = downloadDriver;
export const findEdgePath = find;
export * from './types.js';
//# sourceMappingURL=index.js.map