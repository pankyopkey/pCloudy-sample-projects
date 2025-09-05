/**
 * A polyfill to set `__name` to the global scope which is needed for WebdriverIO to properly
 * execute custom (preload) scripts. When using `tsx` Esbuild runs some optimizations which
 * assume that the file contains these global variables. This is a workaround until this issue
 * is fixed.
 *
 * @see https://github.com/evanw/esbuild/issues/2605
 */
export declare const polyfillFn: () => void;
//# sourceMappingURL=polyfill.d.ts.map