/**
 * original source: https://github.com/chalk/supports-color/blob/d4f413efaf8da045c5ab440ed418ef02dbb28bf1/index.js
 *
 * This file was imported due to lacking support of CJS environments in the original package.
 */
interface Options {
    /**
     * By default it is `true`, which instructs `supportsColor()` to sniff `process.argv`
     * for the multitude of `--color` flags (see _Info_ below).
     * If `false`, then `process.argv` is not considered when determining color support.
     * @default true
     */
    sniffFlags?: boolean | undefined;
    isTTY?: boolean | undefined;
}
export declare function createSupportsColor(stream: {
    isTTY?: boolean;
}, options?: Options): false | {
    level: number;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
declare const supportsColor: {
    stdout: boolean | {
        level: number;
        hasBasic: boolean;
        has256: boolean;
        has16m: boolean;
    };
    stderr: boolean | {
        level: number;
        hasBasic: boolean;
        has256: boolean;
        has16m: boolean;
    };
};
export default supportsColor;
//# sourceMappingURL=supportsColor.d.ts.map