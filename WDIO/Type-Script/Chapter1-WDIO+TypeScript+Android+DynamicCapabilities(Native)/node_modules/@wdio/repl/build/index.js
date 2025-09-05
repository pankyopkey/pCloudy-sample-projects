// src/index.ts
import vm from "node:vm";
import repl from "node:repl";

// src/constants.ts
var STATIC_RETURNS = {
  driver: "[WebdriverIO REPL client]",
  browser: "[WebdriverIO REPL client]",
  $: "[Function: findElement]",
  $$: "[Function: findElements]"
};
var INTRO_MESSAGE = `
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
`;
var DEFAULT_CONFIG = {
  commandTimeout: 5e3,
  prompt: "\u203A ",
  useGlobal: true,
  useColor: true
};

// src/index.ts
var WDIORepl = class {
  static introMessage = INTRO_MESSAGE;
  _config;
  _isCommandRunning = false;
  _replServer;
  constructor(config) {
    this._config = Object.assign(
      DEFAULT_CONFIG,
      { eval: this.eval.bind(this) },
      config
    );
  }
  eval(cmd, context, filename, callback) {
    if (this._isCommandRunning) {
      return;
    }
    if (cmd && STATIC_RETURNS[cmd.trim()]) {
      return callback(null, STATIC_RETURNS[cmd.trim()]);
    }
    vm.createContext(context);
    this._isCommandRunning = true;
    return this._runCmd(cmd, context, callback);
  }
  _runCmd(cmd, context, callback) {
    try {
      const result = vm.runInContext(cmd, context);
      return this._handleResult(result, callback);
    } catch (e) {
      this._isCommandRunning = false;
      return callback(e, void 0);
    }
  }
  _handleResult(result, callback) {
    if (!result || typeof result.then !== "function") {
      this._isCommandRunning = false;
      return callback(null, result);
    }
    let timeoutCalled = false;
    const timeout = setTimeout(
      () => {
        callback(new Error("Command execution timed out"), void 0);
        this._isCommandRunning = false;
        timeoutCalled = true;
      },
      this._config.commandTimeout
    );
    result.then((res) => {
      if (timeoutCalled) {
        return;
      }
      this._isCommandRunning = false;
      clearTimeout(timeout);
      return callback(null, res);
    }, (e) => {
      if (timeoutCalled) {
        return;
      }
      this._isCommandRunning = false;
      clearTimeout(timeout);
      const errorMessage = e ? e.message : "Command execution timed out";
      const commandError = new Error(errorMessage);
      delete commandError.stack;
      return callback(commandError, void 0);
    });
  }
  start(context) {
    if (this._replServer) {
      throw new Error("a repl was already initialized");
    }
    if (context) {
      const evalFn = this._config.eval;
      this._config.eval = function(cmd, _, filename, callback) {
        return evalFn.call(this, cmd, context, filename, callback);
      };
    }
    this._replServer = repl.start(this._config);
    return new Promise((resolve) => {
      return this._replServer.on("exit", resolve);
    });
  }
};
export {
  WDIORepl as default
};
