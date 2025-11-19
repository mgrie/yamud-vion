import type { RelatedEntry } from '../types';

export function parseRelated(rawKey: string, rawValue: string): RelatedEntry {
    const params = rawKey.split(';').slice(1);
    const type = params.find(p => p.startsWith('TYPE='))?.split('=')[1];

    const entry: RelatedEntry = { value: rawValue };

    if (type) entry.type = type;

    return entry;
}
