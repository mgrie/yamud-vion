import { parseKind } from '../src/parse';

describe('parseKind', () => {
    it('should parse valid kind: individual', () => {
        expect(parseKind('individual')).toBe('individual');
    });

    it('should parse valid kind: group (case-insensitive)', () => {
        expect(parseKind('GROUP')).toBe('group');
    });

    it('should return undefined for invalid kind', () => {
        expect(parseKind('robot')).toBeUndefined();
    });

    it('should trim whitespace', () => {
        expect(parseKind('  org  ')).toBe('org');
    });
});
