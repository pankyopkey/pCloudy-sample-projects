import { type remote } from 'webdriver';
import { PrimitiveType, NonPrimitiveType } from './constants.js';
type Serializeable = string | number | boolean | unknown;
type LocalValueParam = Serializeable | (Serializeable)[] | [Serializeable, Serializeable][];
/**
 * Represents a local value with a specified type and optional value.
 * Described in https://w3c.github.io/webdriver-bidi/#type-script-LocalValue
 */
export declare class LocalValue {
    type: PrimitiveType | NonPrimitiveType;
    value?: Serializeable | (Serializeable)[] | [Serializeable, Serializeable][];
    constructor(type: PrimitiveType | NonPrimitiveType, value?: LocalValueParam);
    /**
     * Creates a new LocalValue object with a string value.
     *
     * @param {string} value - The string value to be stored in the LocalValue object.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createStringValue(value: string): LocalValue;
    /**
     * Creates a new LocalValue object with a number value.
     *
     * @param {number} value - The number value.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createNumberValue(value: number): LocalValue;
    /**
     * Creates a new LocalValue object with a special number value.
     *
     * @param {number} value - The value of the special number.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createSpecialNumberValue(value: number): LocalValue;
    /**
     * Creates a new LocalValue object with an undefined value.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createUndefinedValue(): LocalValue;
    /**
     * Creates a new LocalValue object with a null value.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createNullValue(): LocalValue;
    /**
     * Creates a new LocalValue object with a boolean value.
     *
     * @param {boolean} value - The boolean value.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createBooleanValue(value: boolean): LocalValue;
    /**
     * Creates a new LocalValue object with a BigInt value.
     *
     * @param {BigInt} value - The BigInt value.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createBigIntValue(value: bigint): LocalValue;
    /**
     * Creates a new LocalValue object with an array.
     *
     * @param {Array} value - The array.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createArrayValue(value: Array<unknown>): LocalValue;
    /**
     * Creates a new LocalValue object with date value.
     *
     * @param {string} value - The date.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createDateValue(value: Date): LocalValue;
    /**
     * Creates a new LocalValue object of map value.
     * @param {Map} map - The map.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createMapValue(map: Map<unknown, unknown>): LocalValue;
    /**
     * Creates a new LocalValue object from the passed object.
     *
     * @param {Object} map - The object.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createObjectValue(object: Record<string | number | symbol, unknown>): LocalValue;
    /**
     * Creates a new LocalValue object of regular expression value.
     *
     * @param {string} value - The value of the regular expression.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createRegularExpressionValue(value: {
        pattern: string;
        flags: string;
    }): LocalValue;
    /**
     * Creates a new LocalValue object with the specified value.
     * @param {Set} value - The value to be set.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createSetValue(value: ([unknown, unknown] | ReferenceValue | LocalValue)[]): LocalValue;
    /**
     * Creates a new LocalValue object with the given channel value
     *
     * @param {ChannelValue} value - The channel value.
     * @returns {LocalValue} - The created LocalValue object.
     */
    static createChannelValue(value: unknown): LocalValue;
    static createReferenceValue(handle: string, sharedId: string): ReferenceValue;
    static getArgument(argument: unknown): LocalValue | ReferenceValue;
    asMap(): remote.ScriptLocalValue;
}
/**
 * Represents a reference value in the protocol.
 * Described in https://w3c.github.io/webdriver-bidi/#type-script-RemoteReference.
 */
declare class ReferenceValue {
    handle?: string;
    sharedId?: string;
    /**
     * Constructs a new ReferenceValue object.
     * @param {string} handle - The handle value.
     * @param {string} sharedId - The shared ID value.
     */
    constructor(handle: string, sharedId: string);
    asMap(): {
        handle?: string;
        sharedId?: string;
    };
}
export {};
//# sourceMappingURL=value.d.ts.map