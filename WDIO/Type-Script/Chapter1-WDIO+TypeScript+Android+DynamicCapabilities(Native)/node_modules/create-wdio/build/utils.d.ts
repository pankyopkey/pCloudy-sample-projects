import type { SpawnOptions } from 'node:child_process';
import type { ParsedAnswers, ProjectProps, Questionnair, SupportedPackage } from './types.js';
export declare function runProgram(command: string, args: string[], options: SpawnOptions): Promise<void>;
export declare function getPackageVersion(): Promise<string>;
export declare function convertPackageHashToObject(pkg: string, hash?: string): SupportedPackage;
export declare function getAnswers(yes: boolean): Promise<Questionnair>;
/**
 * Receive project properties
 * @returns {@type ProjectProps} if a package.json can be found in cwd or parent directories, otherwise undefined
 *                               which means that a new project can be created
 */
export declare function getProjectProps(cwd?: string): Promise<ProjectProps | undefined>;
export declare function getPathForFileGeneration(answers: Questionnair, projectRootDir: string): {
    destSpecRootPath: string;
    destStepRootPath: string;
    destPageObjectRootPath: string;
    destSerenityLibRootPath: string;
    relativePath: string;
};
/**
 * Get project root directory based on questionaire answers
 * @param answers questionaire answers
 * @param projectProps project properties received via `getProjectProps`
 * @returns project root path
 */
export declare function getProjectRoot(parsedAnswers?: Questionnair): Promise<string>;
/**
 * create package.json if not already existing
 */
export declare function createPackageJSON(parsedAnswers: ParsedAnswers): Promise<false | undefined>;
/**
 * set up TypeScript if it is desired but not installed
 */
export declare function setupTypeScript(parsedAnswers: ParsedAnswers): Promise<void>;
export declare function npmInstall(parsedAnswers: ParsedAnswers, npmTag: string): Promise<void>;
export declare function addServiceDeps(names: SupportedPackage[], packages: string[], update?: boolean): void;
export declare function createWDIOConfig(parsedAnswers: ParsedAnswers): Promise<void>;
export declare const renderFile: (path: string, data: Record<string, unknown>) => Promise<string>;
export declare function createWDIOScript(parsedAnswers: ParsedAnswers): Promise<boolean>;
export declare function runAppiumInstaller(parsedAnswers: ParsedAnswers): Promise<void | import("execa").Result<{
    stdio: "inherit";
}>>;
export declare function getSerenityPackages(answers: Questionnair): string[];
/**
 * detect the package manager that was used
 * uses the environment variable `npm_config_user_agent` to detect the package manager
 * falls back to `npm` if no package manager could be detected
 */
export declare function detectPackageManager(): import("./constants.js").PACKAGE_MANAGER;
export declare function getDefaultFiles(answers: Questionnair, pattern: string): Promise<string>;
/**
 * detect if project has a compiler file
 */
export declare function detectCompiler(answers: Questionnair): Promise<boolean>;
/**
 * Ensure core WebdriverIO packages have the same version as cli so that if someone
 * installs `@wdio/cli@next` and runs the wizard, all related packages have the same version.
 * running `matchAll` to a version like "8.0.0-alpha.249+4bc237701", results in:
 * ['8.0.0-alpha.249+4bc237701', '8', '0', '0', 'alpha', '249', '4bc237701']
 */
export declare function specifyVersionIfNeeded(packagesToInstall: string[], version: string, npmTag: string): string[];
/**
 * generate test files based on CLI answers
 */
export declare function generateTestFiles(answers: ParsedAnswers): Promise<void>;
export declare function generateBrowserRunnerTestFiles(answers: ParsedAnswers): Promise<void>;
/**
 * Helper utility used in `run` and `install` command to format a provided config path,
 * giving it back as an absolute path, and a version without the file extension
 * @param config the initially given file path to the WDIO config file
 */
export declare function formatConfigFilePaths(config: string): Promise<{
    fullPath: string;
    fullPathNoExtension: string;
}>;
export declare function findInConfig(config: string, type: string): RegExpMatchArray | null;
export declare function replaceConfig(config: string, type: string, name: string): string | undefined;
//# sourceMappingURL=utils.d.ts.map