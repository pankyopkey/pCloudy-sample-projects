import type { Argv } from 'yargs';
import type { InstallCommandArguments } from '../types.js';
export declare const command = "install <type> <name>";
export declare const desc: string;
export declare const cmdArgs: {
    readonly config: {
        readonly desc: "Location of your WDIO configuration (default: wdio.conf.(js|ts|cjs|mjs))";
    };
};
export declare const builder: (yargs: Argv) => Argv<{}>;
export declare function handler(argv: InstallCommandArguments): Promise<void>;
//# sourceMappingURL=install.d.ts.map