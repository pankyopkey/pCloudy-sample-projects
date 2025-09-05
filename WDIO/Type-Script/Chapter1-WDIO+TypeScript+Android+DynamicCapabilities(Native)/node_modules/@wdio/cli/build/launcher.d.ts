import { ConfigParser } from '@wdio/config/node';
import type { Services } from '@wdio/types';
import CLInterface from './interface.js';
import type { RunCommandArguments } from './types.js';
export interface EndMessage {
    cid: string;
    exitCode: number;
    specs: string[];
    retries: number;
}
declare class Launcher {
    #private;
    private _configFilePath;
    private _args;
    private _isWatchMode;
    configParser: ConfigParser;
    isMultiremote: boolean;
    isParallelMultiremote: boolean;
    runner?: Services.RunnerInstance;
    interface?: CLInterface;
    private _exitCode;
    private _hasTriggeredExitRoutine;
    private _schedule;
    private _rid;
    private _runnerStarted;
    private _runnerFailed;
    private _launcher?;
    private _resolve?;
    constructor(_configFilePath: string, _args?: Partial<RunCommandArguments>, _isWatchMode?: boolean);
    /**
     * run sequence
     * @return  {Promise}  that only gets resolved with either an exitCode or an error
     */
    run(): Promise<undefined | number>;
    /**
     * initialize launcher by loading `tsx` if needed
     */
    initialize(): Promise<void>;
    /**
     * run without triggering onPrepare/onComplete hooks
     */
    private _runMode;
    /**
     * Format the specs into an array of objects with files and retries
     */
    private _formatSpecs;
    /**
     * run multiple single remote tests
     * @return {Boolean} true if all specs have been run and all instances have finished
     */
    private _runSpecs;
    /**
     * gets number of all running instances
     * @return {number} number of running instances
     */
    private _getNumberOfRunningInstances;
    /**
     * get number of total specs left to complete whole suites
     * @return {number} specs left to complete suite
     */
    private _getNumberOfSpecsLeft;
    /**
     * Start instance in a child process.
     * @param  {Array} specs  Specs to run
     * @param  {number} cid  Capabilities ID
     * @param  {string} rid  Runner ID override
     * @param  {number} retries  Number of retries remaining
     */
    private _startInstance;
    private _workerHookError;
    /**
     * generates a runner id
     * @param  {number} cid capability id (unique identifier for a capability)
     * @return {String}     runner id (combination of cid and test id e.g. 0a, 0b, 1a, 1b ...)
     */
    private _getRunnerId;
    /**
     * Close test runner process once all child processes have exited
     * @param  {number} cid       Capabilities ID
     * @param  {number} exitCode  exit code of child process
     * @param  {Array} specs      Specs that were run
     * @param  {number} retries   Number or retries remaining
     */
    private _endHandler;
    /**
     * We need exitHandler to catch SIGINT / SIGTERM events.
     * Make sure all started selenium sessions get closed properly and prevent
     * having dead driver processes. To do so let the runner end its Selenium
     * session first before killing
     */
    private _exitHandler;
    /**
     * returns true if user stopped watch mode, ex with ctrl+c
     * @returns {boolean}
     */
    private _isWatchModeHalted;
}
export default Launcher;
//# sourceMappingURL=launcher.d.ts.map