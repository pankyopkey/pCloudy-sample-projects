import type { Argv, Options } from 'yargs';
import type { ReplCommandArguments } from '../types.js';
export declare const command = "repl <option> [capabilities]";
export declare const desc = "Run WebDriver session in command line";
export declare const cmdArgs: {
    [k in keyof ReplCommandArguments]?: Options;
};
export declare const builder: (yargs: Argv) => unknown;
export declare const handler: (argv: ReplCommandArguments) => Promise<void>;
//# sourceMappingURL=repl.d.ts.map