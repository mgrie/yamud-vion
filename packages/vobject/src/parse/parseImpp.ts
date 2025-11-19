import type { ImppEntry } from '../types';

export function parseImpp(rawKey: string, rawValue: string): ImppEntry {
    const params = rawKey.split(';').slice(1);

    const type = params.find(p => p.startsWith('TYPE='))?.split('=')[1];
    const label = params.find(p => p.startsWith('LABEL='))?.split('=')[1];

    const entry: ImppEntry = { value: rawValue };

    if (type) entry.type = type;
    if (label) entry.label = label;

    return entry;
}
