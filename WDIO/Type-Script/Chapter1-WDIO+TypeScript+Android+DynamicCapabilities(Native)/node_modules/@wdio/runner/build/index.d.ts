import { EventEmitter } from 'node:events';
import type { RunParams } from './types.js';
export default class Runner extends EventEmitter {
    #private;
    private _browser?;
    private _configParser?;
    private _sigintWasCalled;
    private _isMultiremote;
    private _specFileRetryAttempts;
    private _reporter?;
    private _framework?;
    private _config?;
    private _cid?;
    private _specs?;
    private _caps?;
    private _sessionInitError?;
    /**
     * run test suite
     * @param  {string}    cid            worker id (e.g. `0-0`)
     * @param  {Object}    args           config arguments passed into worker process
     * @param  {string[]}  specs          list of spec files to run
     * @param  {Object}    caps           capabilities to run session with
     * @param  {string}    configFile      path to config file to get config from
     * @param  {number}    retries        number of retries remaining
     * @return {Promise}                  resolves in number of failures for testrun
     */
    run({ cid, args, specs, caps, configFile, retries }: RunParams): Promise<number>;
    /**
     * init protocol session
     * @param  {object}  config        configuration of sessions
     * @param  {Object}  caps          desired capabilities of session
     * @param  {Object}  browserStub   stubbed `browser` object with only capabilities, config and env flags
     * @return {Promise}               resolves with browser object or null if session couldn't get established
     */
    private _initSession;
    /**
     * start protocol session
     * @param  {object}  config        configuration of sessions
     * @param  {Object}  caps          desired capabilities of session
     * @return {Promise}               resolves with browser object or null if session couldn't get established
     */
    private _startSession;
    /**
     * kill worker session
     */
    private _shutdown;
    /**
     * end WebDriver session, a config object can be applied if object has changed
     * within a hook by the user
     */
    endSession(payload?: any): Promise<void>;
}
export { default as BaseReporter } from './reporter.js';
export * from './types.js';
//# sourceMappingURL=index.d.ts.map