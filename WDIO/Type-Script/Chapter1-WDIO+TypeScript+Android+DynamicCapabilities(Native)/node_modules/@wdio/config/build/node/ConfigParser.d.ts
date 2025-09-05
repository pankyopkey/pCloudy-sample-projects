import type { Capabilities, Options, Services } from '@wdio/types';
import type { PathService } from '../types.js';
type Spec = string | string[];
interface TestrunnerOptionsWithParameters extends Options.Testrunner {
    watch?: boolean;
    coverage?: boolean;
    spec?: string[];
    suite?: string[];
    repeat?: number;
    capabilities?: Capabilities.TestrunnerCapabilities;
    rootDir: string;
    tsConfigPath?: string;
}
interface MergeConfig extends Omit<Partial<TestrunnerOptionsWithParameters>, 'specs' | 'exclude'> {
    specs?: Spec[];
    'wdio:specs'?: Spec[];
    exclude?: string[];
    'wdio:exclude'?: string[];
    group?: boolean;
}
export default class ConfigParser {
    #private;
    /**
     * config options parsed in via CLI arguments and applied before
     * trying to compile config file
     */
    private _initialConfig;
    private _pathService;
    private _config;
    private _capabilities?;
    constructor(configFilePath: string, 
    /**
     * config options parsed in via CLI arguments and applied before
     * trying to compile config file
     */
    _initialConfig?: Partial<TestrunnerOptionsWithParameters>, _pathService?: PathService);
    /**
     * initializes the config object
     */
    initialize(object?: MergeConfig): Promise<void>;
    /**
     * merges config file with default values
     * @param {string} filename path of file relative to current directory
     */
    private addConfigFile;
    /**
     * merge external object with config object
     * @param  {Object} object  desired object to merge into the config object
     * @param {boolean} [addPathToSpecs=true] this flag determines whether it is necessary to find paths to specs if the --spec parameter was passed in CLI
     */
    private merge;
    /**
     * Add hooks from an existing service to the runner config.
     * @param {object} service - an object that contains hook methods.
     */
    addService(service: Services.Hooks): void;
    /**
     * determine what specs to run based on the spec(s), suite(s), exclude
     * attributes from CLI, config and capabilities
     */
    getSpecs(capSpecs?: Spec[], capExclude?: Spec[]): Spec[];
    /**
     * sets config attribute with file paths from filtering
     * options from cli argument
     *
     * @param  {string[]} cliArgFileList  list of files in a string form
     * @param  {Object} config  config object that stores the spec and exclude attributes
     * cli argument
     * @return {String[]} List of files that should be included or excluded
     */
    setFilePathToFilterOptions(cliArgFileList: string[], specs: Spec[], group?: boolean): string[];
    /**
     * return configs
     */
    getConfig(): Required<WebdriverIO.Config>;
    /**
     * return capabilities
     */
    getCapabilities(i?: number): Capabilities.TestrunnerCapabilities | Capabilities.RequestedStandaloneCapabilities;
    /**
     * returns a flattened list of globbed files
     *
     * @param  {String[] | String[][]} patterns list of files to glob
     * @param  {Boolean} omitWarnings to indicate omission of warnings
     * @param  {FileSystemPathService} findAndGlob system path service for expanding globbed file names
     * @param  {number} hierarchyDepth depth to prevent recursive calling beyond a depth of 1
     * @return {String[] | String[][]} list of files
     */
    static getFilePaths(patterns: Spec[], rootDir: string, findAndGlob?: PathService, hierarchyDepth?: number): Spec[];
    /**
     * returns specs files with the excludes filtered
     *
     * @param  {String[] | String[][]} spec files -  list of spec files
     * @param  {string[]} excludeList files -  list of exclude files
     * @return {String[] | String[][]} list of spec files with excludes removed
     */
    filterSpecs(specs: Spec[], excludeList: string[]): Spec[];
    shard(specs: Spec[]): Spec[];
}
export {};
//# sourceMappingURL=ConfigParser.d.ts.map