import { parseAnniversary } from '../src/parse';

describe('parseAnniversary', () => {
    it('should parse compact format', () => {
        expect(parseAnniversary('20001231')).toBe('2000-12-31');
    });

    it('should parse ISO date', () => {
        expect(parseAnniversary('2000-12-31')).toBe('2000-12-31');
    });

    it('should parse ISO datetime', () => {
        expect(parseAnniversary('2000-12-31T00:00:00Z')).toBe('2000-12-31T00:00:00Z');
    });

    it('should return undefined for invalid format', () => {
        expect(parseAnniversary('31.12.2000')).toBeUndefined();
    });
});
