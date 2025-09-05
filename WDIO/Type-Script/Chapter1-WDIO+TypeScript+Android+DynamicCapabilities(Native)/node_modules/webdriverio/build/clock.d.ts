import type { FakeTimerInstallOpts, InstalledClock, install } from '@sinonjs/fake-timers';
declare global {
    interface Window {
        __clock: InstalledClock;
        __wdio_sinon: {
            install: typeof install;
        };
    }
}
export declare class ClockManager {
    #private;
    constructor(browser: WebdriverIO.Browser);
    /**
     * Install fake timers on the browser. If you call the `emulate` command, WebdriverIO will automatically install
     * the fake timers for you. You can use this method to re-install the fake timers if you have called `restore`.
     *
     * @param options {FakeTimerInstallOpts} Options to pass to the fake clock
     * @returns {Promise<void>}
     */
    install(options?: FakeTimerInstallOpts): Promise<void>;
    /**
     * Restore all overridden native functions. This is automatically called between tests, so should not
     * generally be needed.
     *
     * ```ts
     * it('should restore the clock', async () => {
     *   console.log(new Date()) // returns e.g. 1722560447102
     *
     *   const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
     *   console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000
     *
     *   await clock.restore()
     *   console.log(await browser.execute(() => new Date().getTime())) // returns 1722560447102
     * })
     * ```
     *
     * @returns {Promise<void>}
     */
    restore(): Promise<void>;
    /**
     * Move the clock the specified number of `milliseconds`. Any timers within the affected range of time will be called.
     * @param ms {number} The number of milliseconds to move the clock.
     *
     * ```ts
     * it('should move the clock', async () => {
     *   console.log(new Date()) // returns e.g. 1722560447102
     *
     *   const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
     *   console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000
     *
     *   await clock.tick(1000)
     *   console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
     * })
     * ```
     *
     * @param    {number}  ms  The number of milliseconds to move the clock.
     * @returns  {Promise<void>}
     */
    tick(ms: number): Promise<void>;
    /**
     * Change the system time to the new now. Now can be a timestamp, date object, or not passed in which defaults
     * to 0. No timers will be called, nor will the time left before they trigger change.
     *
     * ```ts
     * it('should set the system time', async () => {
     *   const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
     *   console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000
     *
     *   await clock.setSystemTime(new Date(2011, 3, 15))
     *   console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
     * })
     * ```
     *
     * @param date {Date|number} The new date to set the system time to.
     * @returns    {Promise<void>}
     */
    setSystemTime(date: number | Date): Promise<void>;
}
//# sourceMappingURL=clock.d.ts.map