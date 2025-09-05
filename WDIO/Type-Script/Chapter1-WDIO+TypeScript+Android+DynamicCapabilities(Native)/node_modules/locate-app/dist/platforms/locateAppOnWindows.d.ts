import { ILocateAppOptions } from '../locateApp';
export declare function locateAppOnWindows({ appName, windowsSuffix, }: Pick<Required<ILocateAppOptions>, 'appName' | 'windowsSuffix'>): Promise<string>;
