import type { FakeTimerInstallOpts } from '@sinonjs/fake-timers';
import { ClockManager } from '../../clock.js';
import { type DeviceName } from '../../deviceDescriptorsSource.js';
type RestoreFunction = () => Promise<any>;
type ColorScheme = 'light' | 'dark';
export declare function emulate(scope: 'clock', options?: FakeTimerInstallOpts): Promise<ClockManager>;
export declare function emulate(scope: 'geolocation', geolocation: Partial<GeolocationCoordinates>): Promise<RestoreFunction>;
export declare function emulate(scope: 'userAgent', userAgent: string): Promise<RestoreFunction>;
export declare function emulate(scope: 'device', userAgent: DeviceName): Promise<RestoreFunction>;
export declare function emulate(scope: 'colorScheme', colorScheme: ColorScheme): Promise<RestoreFunction>;
export declare function emulate(scope: 'onLine', state: boolean): Promise<RestoreFunction>;
export {};
//# sourceMappingURL=emulate.d.ts.map