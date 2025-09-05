import type { string_email } from '../../../types/typeAliases';
import type { really_unknown } from '../../organization/really_unknown';
/**
 * Checks if value is valid email
 *
 * @public exported from `@promptbook/utils`
 */
export declare function isValidEmail(email: really_unknown): email is string_email;
