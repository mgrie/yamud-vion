import type { NameEntry } from '../types';

export function parseName(rawValue: string): NameEntry {
    const [lastName, firstName, additional, prefix, suffix] = rawValue.split(';');

    const result: NameEntry = {};

    if (lastName) result.lastName = lastName;
    if (firstName) result.firstName = firstName;

    if (additional) {
        const names = additional.split(',').map(s => s.trim()).filter(Boolean);
        if (names.length > 0) result.additionalNames = names;
    }

    if (prefix) {
        const prefixes = prefix.split(',').map(s => s.trim()).filter(Boolean);
        if (prefixes.length > 0) result.honorificPrefixes = prefixes;
    }

    if (suffix) {
        const suffixes = suffix.split(',').map(s => s.trim()).filter(Boolean);
        if (suffixes.length > 0) result.honorificSuffixes = suffixes;
    }

    return result;
}
