export function parseCategories(rawValue: string): string[] {
    return rawValue
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
}
