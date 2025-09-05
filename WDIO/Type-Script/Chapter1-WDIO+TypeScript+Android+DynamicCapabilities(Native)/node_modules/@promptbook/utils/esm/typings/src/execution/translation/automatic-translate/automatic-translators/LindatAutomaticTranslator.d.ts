import type { AutomaticTranslator } from './AutomaticTranslator';
import type { TranslatorOptions } from './TranslatorOptions';
interface LindatAutomaticTranslatorOptions extends TranslatorOptions {
    apiUrl?: URL;
}
/**
 * @private still in development [🏳]
 */
export declare class LindatAutomaticTranslator implements AutomaticTranslator {
    private readonly options;
    constructor(options: LindatAutomaticTranslatorOptions);
    translate(message: string): Promise<string>;
}
export {};
