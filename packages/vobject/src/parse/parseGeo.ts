import type { VCard } from '../types';

export function parseGeo(rawValue: string): VCard['geo'] | undefined {
    const [latStr, lonStr] = rawValue.split(';');

    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lonStr);

    if (isNaN(latitude) || isNaN(longitude)) return undefined;

    return { latitude, longitude };
}
