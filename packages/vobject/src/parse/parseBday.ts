export function parseBday(rawValue: string): string | undefined {
    const trimmed = rawValue.trim();

    // Normalize YYYYMMDD → YYYY-MM-DD
    const matchCompact = /^(\d{4})(\d{2})(\d{2})$/.exec(trimmed);
    if (matchCompact) {
        return `${matchCompact[1]}-${matchCompact[2]}-${matchCompact[3]}`;
    }

    // Accept ISO 8601 formats directly
    const isoMatch = /^\d{4}-\d{2}-\d{2}(T.*)?$/.exec(trimmed);
    if (isoMatch) {
        return trimmed;
    }

    return undefined;
}
