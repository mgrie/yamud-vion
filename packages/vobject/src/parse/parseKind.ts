import type { VCard } from '../types';

const validKinds: VCard['kind'][] = ['individual', 'group', 'org', 'location'];

export function parseKind(rawValue: string): VCard['kind'] | undefined {
    const value = rawValue.trim().toLowerCase();
    return validKinds.includes(value as VCard['kind']) ? (value as VCard['kind']) : undefined;
}
