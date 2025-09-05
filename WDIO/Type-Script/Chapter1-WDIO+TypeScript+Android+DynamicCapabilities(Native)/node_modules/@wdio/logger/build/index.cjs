const __importMetaUrl = require('url').pathToFileURL(__filename).href;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SENSITIVE_DATA_REPLACER: () => SENSITIVE_DATA_REPLACER,
  default: () => getLogger
});
module.exports = __toCommonJS(index_exports);

// src/utils.ts
var import_safe_regex2 = __toESM(require("safe-regex2"), 1);
var SENSITIVE_DATA_REPLACER = "**MASKED**";
var skipError = (aFunction) => {
  try {
    return aFunction();
  } catch {
    return void 0;
  }
};
var parseMaskingPatterns = (maskingRegexString) => {
  if (typeof maskingRegexString !== "string") {
    return void 0;
  }
  const regexStrings = maskingRegexString?.split(/,\s*/).filter((regexStr) => regexStr.trim() !== "");
  return regexStrings?.map((regexStr) => {
    const regexParts = regexStr.match(/^\/(.*?)\/([gimsuy]*)$/);
    if (!regexParts && (0, import_safe_regex2.default)(regexStr)) {
      return skipError(() => new RegExp(regexStr));
    }
    if (regexParts?.[1] && (0, import_safe_regex2.default)(regexParts[1])) {
      return skipError(() => regexParts[2] ? new RegExp(regexParts[1], regexParts[2]) : new RegExp(regexParts[1]));
    }
    return void 0;
  }).filter((regex) => regex !== void 0);
};
var mask = (text, maskingPatterns) => {
  if (!maskingPatterns || typeof text !== "string") {
    return text;
  }
  const endsWithNewline = text.endsWith("\n");
  let maskedText = text;
  maskingPatterns.forEach((maskingRegex) => {
    maskedText = maskedText.replace(maskingRegex, (fullMatch, ...capturedGroupsAndMore) => {
      const capturedGroups = capturedGroupsAndMore.slice(0, capturedGroupsAndMore.length - 2);
      if (capturedGroups.length === 0) {
        return SENSITIVE_DATA_REPLACER;
      }
      let matchedMaskedText = fullMatch;
      capturedGroups.forEach((group) => {
        matchedMaskedText = matchedMaskedText.replace(group, SENSITIVE_DATA_REPLACER);
      });
      return matchedMaskedText;
    });
  });
  if (endsWithNewline && !maskedText.endsWith("\n")) {
    maskedText += "\n";
  }
  return maskedText;
};

// src/index.ts
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_util = __toESM(require("node:util"), 1);
var import_loglevel = __toESM(require("loglevel"), 1);
var import_chalk = __toESM(require("chalk"), 1);
var import_loglevel_plugin_prefix = __toESM(require("loglevel-plugin-prefix"), 1);
var import_strip_ansi = __toESM(require("strip-ansi"), 1);
import_loglevel_plugin_prefix.default.reg(import_loglevel.default);
var DEFAULT_LEVEL = process.env.WDIO_DEBUG ? "trace" : "info";
var COLORS = {
  error: "red",
  warn: "yellow",
  info: "cyanBright",
  debug: "green",
  trace: "cyan",
  progress: "magenta"
};
var matches = {
  COMMAND: "COMMAND",
  BIDICOMMAND: "BIDI COMMAND",
  DATA: "DATA",
  RESULT: "RESULT",
  BIDIRESULT: "BIDI RESULT"
};
var SERIALIZERS = [{
  /**
   * display error stack
   */
  matches: (err) => err instanceof Error,
  serialize: (err) => err.stack
}, {
  /**
   * color commands blue
   */
  matches: (log2) => log2 === matches.COMMAND || log2 === matches.BIDICOMMAND,
  serialize: (log2) => import_chalk.default.magenta(log2)
}, {
  /**
   * color data yellow
   */
  matches: (log2) => log2 === matches.DATA,
  serialize: (log2) => import_chalk.default.yellow(log2)
}, {
  /**
   * color result cyan
   */
  matches: (log2) => log2 === matches.RESULT || log2 === matches.BIDIRESULT,
  serialize: (log2) => import_chalk.default.cyan(log2)
}];
var loggers = import_loglevel.default.getLoggers();
var logLevelsConfig = {};
var maskingPatternsConfig = {};
var logCache = /* @__PURE__ */ new Set();
var logFile;
var originalFactory = import_loglevel.default.methodFactory;
var wdioLoggerMethodFactory = (wdioLogger) => function(methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (...args) => {
    if (!logFile && process.env.WDIO_LOG_PATH) {
      logFile = import_node_fs.default.createWriteStream(process.env.WDIO_LOG_PATH);
    }
    const match = Object.values(matches).filter((x) => args[0].endsWith(`: ${x}`))[0];
    if (match) {
      const prefixStr = args.shift().slice(0, -match.length - 1);
      args.unshift(prefixStr, match);
    }
    args = args.map((arg) => {
      for (const s of SERIALIZERS) {
        if (s.matches(arg)) {
          return s.serialize(arg);
        }
      }
      return arg;
    });
    const unmaskedLogText = (0, import_strip_ansi.default)(`${import_node_util.default.format.apply(this, args)}
`);
    const maskedLogText = mask(unmaskedLogText, wdioLogger.maskingPatterns);
    if (logFile && logFile.writable) {
      if (logCache.size) {
        logCache.forEach((log2) => {
          if (logFile) {
            logFile.write(log2);
          }
        });
        logCache.clear();
      }
      if (!logsContainInitPackageError(unmaskedLogText)) {
        return logFile.write(maskedLogText);
      }
      logFile.write(maskedLogText);
    }
    logCache.add(maskedLogText);
    if (maskedLogText === unmaskedLogText) {
      rawMethod(...args);
    } else {
      rawMethod(maskedLogText.replace(/\n$/, ""));
    }
  };
};
var progress = function(data) {
  if (process.stdout.isTTY && this.getLevel() <= import_loglevel.default.levels.INFO) {
    const level = "progress";
    const timestampFormatter = import_chalk.default.gray((/* @__PURE__ */ new Date()).toISOString());
    const levelFormatter = import_chalk.default[COLORS[level]](level.toUpperCase());
    const nameFormatter = import_chalk.default.whiteBright(this.name);
    const _data = data.length > 0 ? `${timestampFormatter} ${levelFormatter} ${nameFormatter}: ${data}` : "\r\x1B[K\x1B[?25h";
    process.stdout.write("\x1B[?25l");
    process.stdout.write(`${_data}\r`);
  }
};
function getLogger(name) {
  if (loggers[name]) {
    return loggers[name];
  }
  let logLevel = process.env.WDIO_LOG_LEVEL || DEFAULT_LEVEL;
  const logLevelName = getLogLevelName(name);
  if (logLevelsConfig[logLevelName]) {
    logLevel = logLevelsConfig[logLevelName];
  }
  loggers[name] = import_loglevel.default.getLogger(name);
  const logger = loggers[name];
  logger.setLevel(logLevel);
  logger.maskingPatterns = maskingPatternsConfig[name] ?? parseMaskingPatterns(process.env.WDIO_LOG_MASKING_PATTERNS);
  logger.progress = progress;
  logger.methodFactory = wdioLoggerMethodFactory(logger);
  import_loglevel_plugin_prefix.default.apply(logger, {
    template: "%t %l %n:",
    timestampFormatter: (date) => import_chalk.default.gray(date.toISOString()),
    levelFormatter: (level) => import_chalk.default[COLORS[level]](level.toUpperCase()),
    nameFormatter: (name2) => import_chalk.default.whiteBright(name2)
  });
  return logger;
}
getLogger.waitForBuffer = async () => new Promise((resolve) => {
  if (logFile && Array.isArray(logFile.writableBuffer) && logFile.writableBuffer.length !== 0) {
    return setTimeout(async () => {
      await getLogger.waitForBuffer();
      resolve();
    }, 20);
  }
  resolve();
});
getLogger.setLevel = (name, level) => loggers[name].setLevel(level);
getLogger.clearLogger = () => {
  if (logFile) {
    logFile.end();
  }
  logFile = null;
};
getLogger.setLogLevelsConfig = (logLevels = {}, wdioLogLevel = DEFAULT_LEVEL) => {
  if (process.env.WDIO_LOG_LEVEL === void 0) {
    process.env.WDIO_LOG_LEVEL = wdioLogLevel;
  }
  logLevelsConfig = {};
  Object.entries(logLevels).forEach(([logName, logLevel]) => {
    const logLevelName = getLogLevelName(logName);
    logLevelsConfig[logLevelName] = logLevel;
  });
  Object.keys(loggers).forEach((logName) => {
    const logLevelName = getLogLevelName(logName);
    const logLevel = typeof logLevelsConfig[logLevelName] !== "undefined" ? logLevelsConfig[logLevelName] : process.env.WDIO_LOG_LEVEL;
    loggers[logName].setLevel(logLevel);
  });
};
getLogger.setMaskingPatterns = (pattern) => {
  if (typeof pattern === "string") {
    if (process.env.WDIO_LOG_MASKING_PATTERNS === void 0) {
      process.env.WDIO_LOG_MASKING_PATTERNS = pattern;
    }
  } else if (typeof pattern === "object") {
    maskingPatternsConfig = Object.entries(pattern).reduce((acc, [logName, maskingPatternsString]) => {
      acc[logName] = parseMaskingPatterns(maskingPatternsString);
      return acc;
    }, maskingPatternsConfig);
  } else {
    throw new Error(`Invalid pattern property, expected \`string\` or \`Record<string, string>\` but received \`${typeof pattern}\``);
  }
  Object.keys(loggers).forEach((logName) => {
    const maskingPatterns = maskingPatternsConfig[logName] ?? parseMaskingPatterns(process.env.WDIO_LOG_MASKING_PATTERNS);
    loggers[logName].maskingPatterns = maskingPatterns;
  });
};
var getLogLevelName = (logName) => logName.split(":").shift();
function logsContainInitPackageError(logText) {
  return ERROR_LOG_VALIDATOR.every((pattern) => logText.includes(pattern));
}
var ERROR_LOG_VALIDATOR = [
  "Couldn't find plugin",
  "neither as wdio scoped package",
  "nor as community package",
  "Please make sure you have it installed"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SENSITIVE_DATA_REPLACER
});
