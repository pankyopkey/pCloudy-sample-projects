import type { Argv } from 'yargs';
import { runConfigCommand } from './utils.js';
import type { ConfigCommandArguments } from '../types.js';
export declare const command = "config";
export declare const desc = "Initialize WebdriverIO and setup configuration in your current project.";
export declare const cmdArgs: {
    readonly yarn: {
        readonly type: "boolean";
        readonly desc: "Install packages via Yarn package manager.";
        readonly default: boolean;
    };
    readonly yes: {
        readonly alias: "y";
        readonly desc: "will fill in all config defaults without prompting";
        readonly type: "boolean";
        readonly default: false;
    };
    readonly npmTag: {
        readonly alias: "t";
        readonly desc: "define NPM tag to use for WebdriverIO related packages";
        readonly type: "string";
        readonly default: "latest";
    };
};
export declare const builder: (yargs: Argv) => Argv<import("yargs").Omit<{}, "yarn" | "yes" | "npmTag"> & import("yargs").InferredOptionTypes<{
    readonly yarn: {
        readonly type: "boolean";
        readonly desc: "Install packages via Yarn package manager.";
        readonly default: boolean;
    };
    readonly yes: {
        readonly alias: "y";
        readonly desc: "will fill in all config defaults without prompting";
        readonly type: "boolean";
        readonly default: false;
    };
    readonly npmTag: {
        readonly alias: "t";
        readonly desc: "define NPM tag to use for WebdriverIO related packages";
        readonly type: "string";
        readonly default: "latest";
    };
}>>;
export declare function handler(argv: ConfigCommandArguments, runConfigCmd?: typeof runConfigCommand): Promise<{
    success: boolean;
    parsedAnswers: import("../types.js").ParsedAnswers;
    installedPackages: string[];
}>;
export { missingConfigurationPrompt, canAccessConfigPath } from './utils.js';
export { formatConfigFilePaths } from '../utils.js';
//# sourceMappingURL=config.d.ts.map