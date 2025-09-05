import cp from 'node:child_process';
import { type SafaridriverOptions as SafaridriverParameters } from 'safaridriver';
import { type GeckodriverParameters } from 'geckodriver';
import { type EdgedriverParameters } from 'edgedriver';
import type { InstallOptions } from '@puppeteer/browsers';
import type { Capabilities } from '@wdio/types';
export type ChromedriverParameters = (Partial<InstallOptions> & Omit<EdgedriverParameters, 'port' | 'edgeDriverVersion' | 'customEdgeDriverPath'> & Pick<GeckodriverParameters, 'spawnOpts'>);
declare global {
    namespace WebdriverIO {
        interface ChromedriverOptions extends ChromedriverParameters {
        }
        interface GeckodriverOptions extends Omit<GeckodriverParameters, 'port'> {
        }
        interface EdgedriverOptions extends Omit<EdgedriverParameters, 'port'> {
        }
        interface SafaridriverOptions extends Omit<SafaridriverParameters, 'port'> {
        }
    }
}
export declare function startWebDriver(options: Capabilities.RemoteConfig): Promise<cp.ChildProcess | undefined>;
//# sourceMappingURL=startWebDriver.d.ts.map