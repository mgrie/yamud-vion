import {AddressEntry} from "../types";

export function parseAddress(rawKey: string, rawValue: string): AddressEntry {
    const params = rawKey.split(';').slice(1);

    const type = params.find(p => p.startsWith('TYPE='))?.split('=')[1];
    const label = params.find(p => p.startsWith('LABEL='))?.split('=')[1];
    const pref = parseInt(params.find(p => p.startsWith('PREF='))?.split('=')[1] ?? '', 10);

    const parts = rawValue.split(';');
    const entry: AddressEntry = {};

    if (type) entry.type = type;
    if (label) entry.label = label;
    if (!isNaN(pref)) entry.pref = pref;
    if (parts[2]) entry.street = parts[2];
    if (parts[3]) entry.city = parts[3];
    if (parts[4]) entry.region = parts[4];
    if (parts[5]) entry.postalCode = parts[5];
    if (parts[6]) entry.country = parts[6];

    return entry;
}
