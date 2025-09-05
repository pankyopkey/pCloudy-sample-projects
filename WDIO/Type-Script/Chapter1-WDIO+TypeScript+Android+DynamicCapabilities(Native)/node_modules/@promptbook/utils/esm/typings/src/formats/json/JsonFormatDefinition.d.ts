import type { TODO_any } from '../../utils/organization/TODO_any';
import type { FormatDefinition } from '../_common/FormatDefinition';
/**
 * Definition for JSON format
 *
 * @private still in development [🏢]
 */
export declare const JsonFormatDefinition: FormatDefinition<string, string, TODO_any, TODO_any>;
/**
 * TODO: [🧠] Maybe propper instance of object
 * TODO: [0] Make string_serialized_json
 * TODO: [1] Make type for JSON Settings and Schema
 * TODO: [🧠] What to use for validating JSONs - JSON Schema, ZoD, typescript types/interfaces,...?
 * TODO: [🍓] In `JsonFormatDefinition` implement simple `isValid`
 * TODO: [🍓] In `JsonFormatDefinition` implement partial `canBeValid`
 * TODO: [🍓] In `JsonFormatDefinition` implement `heal
 * TODO: [🍓] In `JsonFormatDefinition` implement `subvalueDefinitions`
 * TODO: [🏢] Allow to expect something inside JSON objects and other formats
 */
