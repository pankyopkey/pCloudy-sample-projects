import { ILocateAppOptions } from '../locateApp';
export declare function locateAppOnLinux({ appName, linuxWhich, }: Pick<Required<ILocateAppOptions>, 'appName' | 'linuxWhich'>): Promise<string>;
