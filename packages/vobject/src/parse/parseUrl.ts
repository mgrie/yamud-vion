import type { UrlEntry } from '../types';

export function parseUrl(rawKey: string, rawValue: string): UrlEntry {
    const params = rawKey.split(';').slice(1);

    const type = params.find(p => p.startsWith('TYPE='))?.split('=')[1];
    const label = params.find(p => p.startsWith('LABEL='))?.split('=')[1];

    const entry: UrlEntry = { value: rawValue };

    if (type) entry.type = type;
    if (label) entry.label = label;

    return entry;
}
