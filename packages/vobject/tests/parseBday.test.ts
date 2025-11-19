import { parseBday } from '../src/parse';

describe('parseBday', () => {
    it('should parse compact date format', () => {
        expect(parseBday('19850412')).toBe('1985-04-12');
    });

    it('should parse ISO date format', () => {
        expect(parseBday('1985-04-12')).toBe('1985-04-12');
    });

    it('should parse ISO datetime format', () => {
        expect(parseBday('1985-04-12T23:20:50Z')).toBe('1985-04-12T23:20:50Z');
    });

    it('should trim whitespace', () => {
        expect(parseBday(' 19850412 ')).toBe('1985-04-12');
    });

    it('should return undefined for invalid format', () => {
        expect(parseBday('12.04.1985')).toBeUndefined();
    });
});
