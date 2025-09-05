/// <reference path="../../src/platforms/userhome.d.ts" />
import { ILocateAppOptions } from '../locateApp';
export declare function locateAppOnMacOs({ appName, macOsName, }: Pick<Required<ILocateAppOptions>, 'appName' | 'macOsName'>): Promise<string>;
