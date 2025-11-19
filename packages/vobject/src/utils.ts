import {VCard} from "./types";

export function splitLines(input: string): string[] {
    return input.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

export function isVCard(raw: string): boolean {
    const beginMatches = raw.match(/^BEGIN:VCARD$/gm) ?? [];
    const endMatches = raw.match(/^END:VCARD$/gm) ?? [];
    return beginMatches.length === 1 && endMatches.length === 1;
}


export function isVList(raw: string): boolean {
    const beginMatches = raw.match(/^BEGIN:VLIST$/gm) ?? [];
    const endMatches = raw.match(/^END:VLIST$/gm) ?? [];
    return beginMatches.length === 1 && endMatches.length === 1;
}

export function escapeVCardValue(value: string): string {
    return value
        .replace(/\\/g, '\\\\')   // Backslash zuerst
        .replace(/\n/g, '\\n')    // Zeilenumbruch
        .replace(/;/g, '\\;')     // Semikolon
        .replace(/,/g, '\\,')     // Komma
        .replace(/:/g, '\\:');    // Doppelpunkt
}

export function validateVCard(v: VCard): string[] {
    const errors: string[] = [];
    if (!v.fn) errors.push('Missing FN');
    if (!v.uid) errors.push('Missing UID');
    if (v.gender && !['M', 'F', 'O', 'N', 'U'].includes(v.gender)) {
        errors.push(`Invalid gender: ${v.gender}`);
    }
    return errors;
}

export function unescapeVCardValue(value: string): string {
    return value
        .replace(/\\\\/g, '\\')   // Backslash zuerst
        .replace(/\\n/g, '\n')    // Zeilenumbruch
        .replace(/\\;/g, ';')     // Semikolon
        .replace(/\\,/g, ',')     // Komma
        .replace(/\\:/g, ':');    // Doppelpunkt
}

export function getPreferredEmail(vcard: VCard): string | undefined {
    if (!vcard.email?.length) return undefined;

    const sorted = [...vcard.email].sort((a, b) => {
        const ap = a.pref ?? Infinity;
        const bp = b.pref ?? Infinity;
        return ap - bp;
    });

    return sorted[0]?.value;
}

export function getPreferredAddress(vcard: VCard): string | undefined {
    if (!vcard.address?.length) return undefined;

    const sorted = [...vcard.address].sort((a, b) => {
        const ap = a.pref ?? Infinity;
        const bp = b.pref ?? Infinity;
        return ap - bp;
    });

    const addr = sorted[0];
    return [
        addr.street,
        addr.city,
        addr.region,
        addr.postalCode,
        addr.country,
    ].filter(Boolean).join(', ');
}

