import os from 'node:os';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import which from 'which';
import decamelize from 'decamelize';
export function getNameByArchitecture() {
    const platformIdentifier = os.platform() === 'win32'
        ? 'win'
        : os.platform() === 'darwin'
            ? 'mac'
            : 'linux';
    const arch = ['arm64', 'ppc64', 'x64', 's390x'].includes(os.arch())
        ? '64' + (os.platform() === 'darwin' && os.arch() === 'arm64' ? '_m1' : '')
        : '32';
    return `edgedriver_${platformIdentifier}${arch}`;
}
const EXCLUDED_PARAMS = ['version', 'help'];
export function parseParams(params) {
    return Object.entries(params)
        .filter(([key,]) => !EXCLUDED_PARAMS.includes(key))
        .map(([key, val]) => {
        if (typeof val === 'boolean' && !val) {
            return '';
        }
        const vals = Array.isArray(val) ? val : [val];
        return vals.map((v) => `--${decamelize(key, { separator: '-' })}${typeof v === 'boolean' ? '' : `=${v}`}`);
    })
        .flat()
        .filter(Boolean);
}
/**
 * helper utility to clone a list
 * @param  {Any[]} arr  list of things
 * @return {Any[]}      new list of same things
 */
export function uniq(arr) {
    return Array.from(new Set(arr));
}
export function sort(installations, priorities) {
    const defaultPriority = 10;
    return installations
        // assign priorities
        .map((inst) => {
        for (const pair of priorities) {
            if (pair.regex.test(inst)) {
                return { path: inst, weight: pair.weight };
            }
        }
        return { path: inst, weight: defaultPriority };
    })
        // sort based on priorities
        .sort((a, b) => (b.weight - a.weight))
        // remove priority flag
        .map(pair => pair.path);
}
/**
 * Look for edge executables by using the which command
 */
export function findByWhich(executables, priorities) {
    const installations = [];
    executables.forEach((executable) => {
        try {
            const browserPath = which.sync(executable);
            if (hasAccess(browserPath)) {
                installations.push(browserPath);
            }
        }
        catch {
            // Not installed.
        }
    });
    return sort(uniq(installations.filter(Boolean)), priorities);
}
/**
 * Helper utility to check file access
 * @param {string} file file to check access for
 * @return              true if file can be accessed
 */
export function hasAccessSync(filePath) {
    if (!filePath) {
        return false;
    }
    try {
        fs.accessSync(filePath);
        return true;
    }
    catch {
        return false;
    }
}
export async function hasAccess(filePath) {
    return fsp.access(filePath).then(() => true, () => false);
}
export function sleep(ms = 100) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=utils.js.map