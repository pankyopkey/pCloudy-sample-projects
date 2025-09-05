import { RequireAtLeastOne } from 'type-fest';
export interface ILocateAppOptions {
    appName: string;
    linuxWhich?: string;
    windowsSuffix?: string;
    macOsName?: string;
}
export declare function locateApp({ appName, linuxWhich, windowsSuffix, macOsName, }: RequireAtLeastOne<ILocateAppOptions, 'linuxWhich' | 'windowsSuffix' | 'macOsName'>): Promise<string>;
