/**
 * ToDo(Christian): remove when @wdio/runner got typed
 */
interface RunnerInterface extends NodeJS.EventEmitter {
    sigintWasCalled: boolean;
    [key: string]: unknown;
}
export declare const runner: RunnerInterface;
export {};
//# sourceMappingURL=run.d.ts.map