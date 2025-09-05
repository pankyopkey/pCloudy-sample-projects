import path from 'node:path';
import { expect } from 'expect';
import { stripSnapshotIndentation } from '@vitest/snapshot';
import { SnapshotService } from '../snapshot.js';
function returnSnapshotError(snapshotError) {
    try {
        expect(snapshotError.actual).toBe(snapshotError.expected);
    }
    catch (e) {
        return {
            pass: false,
            message: () => e.message
        };
    }
    throw snapshotError;
}
function toMatchSnapshotAssert(received, message, inlineOptions) {
    const snapshotService = SnapshotService.initiate();
    try {
        snapshotService.client.assert({
            received,
            message,
            filepath: snapshotService.currentFilePath,
            name: snapshotService.currentTestName,
            ...(inlineOptions ? {
                ...inlineOptions,
                isInline: true
            } : {
                isInline: false
            })
        });
        return {
            pass: true,
            message: () => 'Snapshot matches'
        };
    }
    catch (e) {
        return returnSnapshotError(e);
    }
}
async function toMatchSnapshotAsync(asyncReceived, message, inlineOptions) {
    let received = await asyncReceived;
    if (received && typeof received === 'object' && 'elementId' in received) {
        received = await received.getHTML({
            includeSelectorTag: true
        });
    }
    return toMatchSnapshotAssert(received, message, inlineOptions);
}
function toMatchSnapshotHelper(received, message, inlineOptions) {
    const snapshotService = SnapshotService.initiate();
    if (!snapshotService.currentFilePath || !snapshotService.currentTestName) {
        throw new Error('Snapshot service is not initialized');
    }
    if (received && typeof received === 'object' &&
        ('elementId' in received ||
            'then' in received)) {
        return toMatchSnapshotAsync(received, message, inlineOptions);
    }
    return toMatchSnapshotAssert(received, message, inlineOptions);
}
export function toMatchSnapshot(received, message) {
    return toMatchSnapshotHelper(received, message);
}
export function toMatchInlineSnapshot(received, inlineSnapshot, message) {
    const browserErrorLine = this.errorStack;
    function __INLINE_SNAPSHOT__(inlineSnapshot, message) {
        const error = new Error('inline snapshot');
        if (browserErrorLine && error.stack) {
            const stack = error.stack.split('\n');
            error.stack = [
                ...stack.slice(0, 4),
                browserErrorLine,
                ...stack.slice(3)
            ].join('\n');
        }
        const trace = error.stack?.split('\n').filter((line) => (line.includes('__INLINE_SNAPSHOT__') ||
            !(line.includes('__EXTERNAL_MATCHER_TRAP__') ||
                line.includes(`expect-webdriverio${path.sep}lib${path.sep}matchers${path.sep}snapshot.js:`)))).filter((line) => (!line.includes('node_modules/jasmine-core/'))) || [];
        if (process.env.WDIO_INTERNAL_TEST) {
            trace.splice(2, 1);
        }
        if (inlineSnapshot) {
            inlineSnapshot = stripSnapshotIndentation(inlineSnapshot);
        }
        error.stack = trace.join('\n');
        return toMatchSnapshotHelper(received, message, {
            inlineSnapshot,
            error
        });
    }
    return __INLINE_SNAPSHOT__(inlineSnapshot, message);
}
