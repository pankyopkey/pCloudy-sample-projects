import type { string_javascript_name } from '../types/typeAliases';
import type { TODO_string } from './organization/TODO_string';
export type Registered = {
    /**
     * @@@
     */
    packageName: TODO_string;
    /**
     * @@@
     */
    className: TODO_string;
};
/**
 * Register is @@@
 *
 * Note: `$` is used to indicate that this function is not a pure function - it accesses and adds variables in global scope.
 *
 * @private internal utility, exported are only signleton instances of this class
 */
export declare class $Register<TRegistered extends Registered> {
    private readonly storageName;
    private readonly storage;
    constructor(storageName: string_javascript_name);
    list(): Array<TRegistered>;
    register(registered: TRegistered): void;
}
