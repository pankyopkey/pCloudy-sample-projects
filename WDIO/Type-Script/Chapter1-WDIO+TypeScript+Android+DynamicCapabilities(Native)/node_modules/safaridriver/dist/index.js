import fs from 'node:fs';
import cp from 'node:child_process';
export const DEFAULT_PATH = '/usr/bin/safaridriver';
export const DEFAULT_STP_PATH = '/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver';
export const DEFAULT_PORT = 4444;
let instance;
let instanceOptions;
export const start = (options = {}) => {
    const port = typeof options.port === 'number' ? options.port : DEFAULT_PORT;
    const args = [`--port=${port}`];
    const driverPath = options.path || (options.useTechnologyPreview
        ? DEFAULT_STP_PATH
        : DEFAULT_PATH);
    const isSTPInstalled = options.useTechnologyPreview && fs.existsSync(DEFAULT_STP_PATH);
    if (options.useTechnologyPreview && !isSTPInstalled) {
        throw new Error('Safari Technology Preview is not installed! Please go to ' +
            'https://developer.apple.com/safari/technology-preview/ and install it.');
    }
    if (options.enable) {
        args.push('--enable');
    }
    if (options.diagnose) {
        args.push('--diagnose');
    }
    if (instance) {
        throw new Error(`There is already a Safaridriver instance running on port ${instanceOptions.port}!`);
    }
    instanceOptions = options;
    instance = cp.execFile(driverPath, args);
    return instance;
};
export const stop = () => {
    if (instance) {
        instance.kill();
        instance = undefined;
    }
};
export default { start, stop };
//# sourceMappingURL=index.js.map