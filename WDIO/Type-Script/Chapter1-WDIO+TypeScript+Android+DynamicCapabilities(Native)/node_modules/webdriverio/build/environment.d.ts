import type fs from 'node:fs';
import type { downloadFile } from './node/downloadFile.js';
import type { savePDF } from './node/savePDF.js';
import type { saveRecordingScreen } from './node/saveRecordingScreen.js';
import type { uploadFile } from './node/uploadFile.js';
import type { saveScreenshot } from './node/saveScreenshot.js';
import type { saveElementScreenshot } from './node/saveElementScreenshot.js';
/**
 * @internal
 */
export declare const isNode: boolean;
export interface EnvironmentVariables {
    WDIO_UNIT_TESTS?: string;
    WDIO_WORKER_ID?: string;
}
export interface EnvironmentDependencies {
    variables: EnvironmentVariables;
    readFileSync: typeof fs.readFileSync;
    downloadFile: typeof downloadFile;
    savePDF: typeof savePDF;
    saveRecordingScreen: typeof saveRecordingScreen;
    uploadFile: typeof uploadFile;
    saveScreenshot: typeof saveScreenshot;
    saveElementScreenshot: typeof saveElementScreenshot;
    osType: () => string;
}
/**
 * Holder for environment dependencies. These dependencies cannot
 * be used during the module instantiation.
 */
export declare const environment: {
    value: EnvironmentDependencies;
};
//# sourceMappingURL=environment.d.ts.map