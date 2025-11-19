import type { EmailEntry } from '../types';

export function parseEmail(rawKey: string, rawValue: string): EmailEntry {
    const params = rawKey.split(';').slice(1);

    const type = params.find(p => p.startsWith('TYPE='))?.split('=')[1];
    const label = params.find(p => p.startsWith('LABEL='))?.split('=')[1];
    const pref = parseInt(params.find(p => p.startsWith('PREF='))?.split('=')[1] ?? '', 10);

    const entry: EmailEntry = { value: rawValue };

    if (type) entry.type = type;
    if (label) entry.label = label;
    if (!isNaN(pref)) entry.pref = pref;

    return entry;
}
