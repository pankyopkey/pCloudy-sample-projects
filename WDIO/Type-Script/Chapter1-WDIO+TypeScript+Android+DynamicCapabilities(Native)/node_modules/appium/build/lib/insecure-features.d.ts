import type { AppiumDriver } from './appium';
import type { ExternalDriver } from '@appium/types';
/**
 * Configures insecure features according to the values in `args.relaxedSecurityEnabled`,
 * `args.allowInsecure`, and `args.denyInsecure`, and informs the user about any
 * globally-applied features.
 * Uses `logger` instead of `this.log` to reduce user confusion.
 */
export declare function configureGlobalFeatures(this: AppiumDriver): void;
/**
 * If anything in the umbrella driver's insecure feature configuration applies to this driver,
 * assign it to the driver instance
 *
 * @param driver
 * @param driverName
 */
export declare function configureDriverFeatures(this: AppiumDriver, driver: ExternalDriver, driverName: string): void;
//# sourceMappingURL=insecure-features.d.ts.map