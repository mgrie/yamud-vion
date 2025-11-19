import type { MediaEntry } from '../types';

export function parseMedia(rawKey: string, rawValue: string): MediaEntry {
    const params = rawKey.split(';').slice(1).map(p => p.trim());

    let encoding: string | undefined;
    let type: string | undefined;

    for (const param of params) {
        const [rawKey, rawVal] = param.split('=');
        const key = rawKey?.toUpperCase();
        const val = rawVal?.trim();

        if (key === 'ENCODING') encoding = val?.toLowerCase();
        if (key === 'TYPE') type = val;
    }

    const entry: MediaEntry = {};

    if (encoding === 'b') {
        entry.data = rawValue.trim();
        if (type) entry.type = type;
    } else {
        entry.url = rawValue.trim();
        if (type) entry.type = type;
    }

    return entry;
}
