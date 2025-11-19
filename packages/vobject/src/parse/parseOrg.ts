// src/vcf-utils/parse/parseOrg.ts

import type { OrgEntry } from '../types';

export function parseOrg(rawValue: string): OrgEntry {
    const [name, unit] = rawValue.split(';');

    const result: OrgEntry = {
        name: name?.trim() ?? '',
    };

    if (unit?.trim()) {
        result.unit = unit.trim();
    }

    return result;
}
