import type { AddressEntry } from '../types';

export function parseAddress(rawKey: string, rawValue: string): AddressEntry {
    const params = rawKey.split(';').slice(1);

    const type = params.find(p => p.startsWith('TYPE='))?.split('=')[1];
    const label = params.find(p => p.startsWith('LABEL='))?.split('=')[1];
    const pref = parseInt(params.find(p => p.startsWith('PREF='))?.split('=')[1] ?? '', 10);

    const parts = rawValue.split(';');

    return {
        type,
        label,
        pref: isNaN(pref) ? undefined : pref,
        street: parts[2],
        city: parts[3],
        region: parts[4],
        postalCode: parts[5],
        country: parts[6],
    };
}
