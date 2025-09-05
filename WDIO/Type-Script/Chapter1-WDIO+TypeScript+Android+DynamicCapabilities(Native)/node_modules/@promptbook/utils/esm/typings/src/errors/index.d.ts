import { CollectionError } from './CollectionError';
import { EnvironmentMismatchError } from './EnvironmentMismatchError';
import { ExpectError } from './ExpectError';
import { LimitReachedError } from './LimitReachedError';
import { NotFoundError } from './NotFoundError';
import { NotYetImplementedError } from './NotYetImplementedError';
import { ParseError } from './ParseError';
import { PipelineExecutionError } from './PipelineExecutionError';
import { PipelineLogicError } from './PipelineLogicError';
import { PipelineUrlError } from './PipelineUrlError';
import { UnexpectedError } from './UnexpectedError';
/**
 * Index of all custom errors
 *
 * @public exported from `@promptbook/core`
 */
export declare const ERRORS: {
    readonly ExpectError: typeof ExpectError;
    readonly CollectionError: typeof CollectionError;
    readonly EnvironmentMismatchError: typeof EnvironmentMismatchError;
    readonly LimitReachedError: typeof LimitReachedError;
    readonly NotFoundError: typeof NotFoundError;
    readonly NotYetImplementedError: typeof NotYetImplementedError;
    readonly ParseError: typeof ParseError;
    readonly PipelineExecutionError: typeof PipelineExecutionError;
    readonly PipelineLogicError: typeof PipelineLogicError;
    readonly PipelineUrlError: typeof PipelineUrlError;
    readonly UnexpectedError: typeof UnexpectedError;
};
