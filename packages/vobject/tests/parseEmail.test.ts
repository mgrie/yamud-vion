import { parseEmail } from '../src/parse';

describe('parseEmail', () => {
    it('should parse EMAIL with TYPE and PREF', () => {
        const key = 'EMAIL;TYPE=work;PREF=1';
        const value = 'max@example.com';
        const result = parseEmail(key, value);
        expect(result).toEqual({
            value: 'max@example.com',
            type: 'work',
            pref: 1,
        });
    });

    it('should parse EMAIL with LABEL only', () => {
        const key = 'EMAIL;LABEL=Privat';
        const value = 'max@private.com';
        const result = parseEmail(key, value);
        expect(result).toEqual({
            value: 'max@private.com',
            label: 'Privat',
        });
    });

    it('should parse EMAIL with no parameters', () => {
        const key = 'EMAIL';
        const value = 'solo@example.com';
        const result = parseEmail(key, value);
        expect(result).toEqual({
            value: 'solo@example.com',
        });
    });

    it('should ignore invalid PREF values', () => {
        const key = 'EMAIL;PREF=abc';
        const value = 'broken@example.com';
        const result = parseEmail(key, value);
        expect(result.pref).toBeUndefined();
    });
});
