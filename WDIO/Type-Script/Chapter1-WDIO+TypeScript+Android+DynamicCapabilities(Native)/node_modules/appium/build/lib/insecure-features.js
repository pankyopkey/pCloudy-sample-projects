"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureGlobalFeatures = configureGlobalFeatures;
exports.configureDriverFeatures = configureDriverFeatures;
const lodash_1 = __importDefault(require("lodash"));
const logger_1 = __importDefault(require("./logger"));
const ALL_DRIVERS_MATCH = '*';
const FEATURE_NAME_SEPARATOR = ':';
/**
 * Configures insecure features according to the values in `args.relaxedSecurityEnabled`,
 * `args.allowInsecure`, and `args.denyInsecure`, and informs the user about any
 * globally-applied features.
 * Uses `logger` instead of `this.log` to reduce user confusion.
 */
function configureGlobalFeatures() {
    if (this.args.relaxedSecurityEnabled) {
        logger_1.default.info(`Enabling relaxed security. All insecure features will be ` +
            `enabled unless explicitly disabled by --deny-insecure`);
        this.relaxedSecurityEnabled = true;
    }
    else if (!lodash_1.default.isEmpty(this.args.allowInsecure)) {
        this.allowInsecure = validateFeatures(this.args.allowInsecure);
        const globalAllowedFeatures = filterInsecureFeatures(this.allowInsecure);
        if (!lodash_1.default.isEmpty(globalAllowedFeatures)) {
            logger_1.default.info('Explicitly enabling insecure features:');
            globalAllowedFeatures.forEach((a) => logger_1.default.info(`    ${a}`));
        }
    }
    if (lodash_1.default.isEmpty(this.args.denyInsecure)) {
        return;
    }
    this.denyInsecure = validateFeatures(this.args.denyInsecure);
    const globalDeniedFeatures = filterInsecureFeatures(this.denyInsecure);
    if (lodash_1.default.isEmpty(globalDeniedFeatures)) {
        return;
    }
    logger_1.default.info('Explicitly disabling insecure features:');
    globalDeniedFeatures.forEach((a) => logger_1.default.info(`    ${a}`));
}
/**
 * If anything in the umbrella driver's insecure feature configuration applies to this driver,
 * assign it to the driver instance
 *
 * @param driver
 * @param driverName
 */
function configureDriverFeatures(driver, driverName) {
    if (this.relaxedSecurityEnabled) {
        this.log.info(`Enabling relaxed security for this session as per the server configuration. ` +
            `All insecure features will be enabled unless explicitly disabled by --deny-insecure`);
        driver.relaxedSecurityEnabled = true;
    }
    const allowedDriverFeatures = filterInsecureFeatures(this.allowInsecure, driverName);
    if (!lodash_1.default.isEmpty(allowedDriverFeatures)) {
        this.log.info('Explicitly enabling insecure features for this session ' +
            'as per the server configuration:');
        allowedDriverFeatures.forEach((a) => this.log.info(`    ${a}`));
        driver.allowInsecure = allowedDriverFeatures;
    }
    const deniedDriverFeatures = filterInsecureFeatures(this.denyInsecure, driverName);
    if (lodash_1.default.isEmpty(deniedDriverFeatures)) {
        return;
    }
    this.log.info('Explicitly disabling insecure features for this session ' +
        'as per the server configuration:');
    deniedDriverFeatures.forEach((a) => this.log.info(`    ${a}`));
    driver.denyInsecure = deniedDriverFeatures;
}
/**
 * Validates the list of allowed/denied server features
 *
 * @param features
 */
function validateFeatures(features) {
    const validator = (fullName) => {
        const separatorPos = fullName.indexOf(FEATURE_NAME_SEPARATOR);
        // TODO: This is for the backward compatibility with Appium2
        // TODO: In Appium3 the separator will be mandatory
        if (separatorPos < 0) {
            return `${ALL_DRIVERS_MATCH}${FEATURE_NAME_SEPARATOR}${fullName}`;
        }
        const [automationName, featureName] = [
            fullName.substring(0, separatorPos),
            fullName.substring(separatorPos + 1)
        ];
        if (!automationName || !featureName) {
            throw new Error(`The full feature name must include both the destination automation name or the ` +
                `'${ALL_DRIVERS_MATCH}' wildcard to apply the feature to all installed drivers, and ` +
                `the feature name split by a colon, got '${fullName}' instead`);
        }
        return fullName;
    };
    return features.map(validator);
}
/**
 * Filters the list of insecure features to only those that are
 * applicable to the given driver name.
 * Assumes that all feature names have already been validated
 *
 * @param features
 * @param driverName
 */
function filterInsecureFeatures(features, driverName = ALL_DRIVERS_MATCH) {
    const filterFn = (fullName) => {
        const separatorPos = fullName.indexOf(FEATURE_NAME_SEPARATOR);
        if (separatorPos <= 0) {
            return false;
        }
        const automationName = fullName.substring(0, separatorPos);
        return [driverName, ALL_DRIVERS_MATCH].includes(automationName);
    };
    return features.filter(filterFn);
}
//# sourceMappingURL=insecure-features.js.map