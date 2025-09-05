// src/utils.ts
import safeRegexTest from "safe-regex2";
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
    if (!regexParts && safeRegexTest(regexStr)) {
      return skipError(() => new RegExp(regexStr));
    }
    if (regexParts?.[1] && safeRegexTest(regexParts[1])) {
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
import fs from "node:fs";
import util from "node:util";
import log from "loglevel";
import chalk from "chalk";
import prefix from "loglevel-plugin-prefix";
import ansiStrip from "strip-ansi";
prefix.reg(log);
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
  serialize: (log2) => chalk.magenta(log2)
}, {
  /**
   * color data yellow
   */
  matches: (log2) => log2 === matches.DATA,
  serialize: (log2) => chalk.yellow(log2)
}, {
  /**
   * color result cyan
   */
  matches: (log2) => log2 === matches.RESULT || log2 === matches.BIDIRESULT,
  serialize: (log2) => chalk.cyan(log2)
}];
var loggers = log.getLoggers();
var logLevelsConfig = {};
var maskingPatternsConfig = {};
var logCache = /* @__PURE__ */ new Set();
var logFile;
var originalFactory = log.methodFactory;
var wdioLoggerMethodFactory = (wdioLogger) => function(methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (...args) => {
    if (!logFile && process.env.WDIO_LOG_PATH) {
      logFile = fs.createWriteStream(process.env.WDIO_LOG_PATH);
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
    const unmaskedLogText = ansiStrip(`${util.format.apply(this, args)}
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
  if (process.stdout.isTTY && this.getLevel() <= log.levels.INFO) {
    const level = "progress";
    const timestampFormatter = chalk.gray((/* @__PURE__ */ new Date()).toISOString());
    const levelFormatter = chalk[COLORS[level]](level.toUpperCase());
    const nameFormatter = chalk.whiteBright(this.name);
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
  loggers[name] = log.getLogger(name);
  const logger = loggers[name];
  logger.setLevel(logLevel);
  logger.maskingPatterns = maskingPatternsConfig[name] ?? parseMaskingPatterns(process.env.WDIO_LOG_MASKING_PATTERNS);
  logger.progress = progress;
  logger.methodFactory = wdioLoggerMethodFactory(logger);
  prefix.apply(logger, {
    template: "%t %l %n:",
    timestampFormatter: (date) => chalk.gray(date.toISOString()),
    levelFormatter: (level) => chalk[COLORS[level]](level.toUpperCase()),
    nameFormatter: (name2) => chalk.whiteBright(name2)
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
export {
  SENSITIVE_DATA_REPLACER,
  getLogger as default
};
