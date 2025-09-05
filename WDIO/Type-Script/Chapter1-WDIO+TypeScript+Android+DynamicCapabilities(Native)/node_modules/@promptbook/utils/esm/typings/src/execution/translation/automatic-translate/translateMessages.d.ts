import type { AutomaticTranslator } from './automatic-translators/AutomaticTranslator';
import type { TranslatorOptions } from './automatic-translators/TranslatorOptions';
/**
 * @private still in development [🏳]
 */
export declare function translateMessages({ automaticTranslator, from, to, }: {
    automaticTranslator: AutomaticTranslator;
} & TranslatorOptions): Promise<void>;
