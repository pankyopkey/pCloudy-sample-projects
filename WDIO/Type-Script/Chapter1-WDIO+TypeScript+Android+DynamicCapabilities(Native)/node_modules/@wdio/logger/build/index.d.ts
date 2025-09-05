export { SENSITIVE_DATA_REPLACER } from './utils.js';
import log from 'loglevel';
interface LoggerInterface extends log.Logger {
    maskingPatterns: RegExp[] | undefined;
    progress(...msg: string[]): void;
}
declare function getLogger(name: string): LoggerInterface;
declare namespace getLogger {
    var waitForBuffer: () => Promise<void>;
    var setLevel: (name: string, level: log.LogLevelDesc) => void;
    var clearLogger: () => void;
    var setLogLevelsConfig: (logLevels?: Record<string, log.LogLevelDesc>, wdioLogLevel?: log.LogLevelDesc) => void;
    var setMaskingPatterns: (pattern: MaskPattern | MaskPatternForSpecificLogger) => void;
}
export default getLogger;
type MaskPattern = string;
type MaskPatternForSpecificLogger = Record<string, MaskPattern>;
export type Logger = LoggerInterface;
//# sourceMappingURL=index.d.ts.map