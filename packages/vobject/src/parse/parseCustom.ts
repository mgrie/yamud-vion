export function parseCustom(key: string, value: string): [string, string] | undefined {
    const normalizedKey = key.trim().toUpperCase();

    if (
        normalizedKey.startsWith('X-') ||
        normalizedKey.startsWith('CUSTOM') ||
        normalizedKey.startsWith('ITEM') || // z. B. ITEM1.X-ABLABEL
        normalizedKey.includes('X-SOGO-') ||
        normalizedKey.includes('X-AB') ||
        normalizedKey.includes('X-MS') ||
        normalizedKey.includes('X-AIM') ||
        normalizedKey.includes('X-ICQ')
    ) {
        return [key.trim(), value.trim()];
    }

    return undefined;
}
