import { parseTel } from '../src/parse';

describe('parseTel', () => {
    it('should parse TEL with TYPE and PREF', () => {
        const key = 'TEL;TYPE=cell;PREF=1';
        const value = '+491234567890';
        const result = parseTel(key, value);
        expect(result).toEqual({
            value: '+491234567890',
            type: 'cell',
            pref: 1,
        });
    });

    it('should parse TEL with LABEL only', () => {
        const key = 'TEL;LABEL=Privat';
        const value = '+491111111111';
        const result = parseTel(key, value);
        expect(result).toEqual({
            value: '+491111111111',
            label: 'Privat',
        });
    });

    it('should parse TEL with no parameters', () => {
        const key = 'TEL';
        const value = '+492222222222';
        const result = parseTel(key, value);
        expect(result).toEqual({
            value: '+492222222222',
        });
    });

    it('should ignore invalid PREF values', () => {
        const key = 'TEL;PREF=abc';
        const value = '+493333333333';
        const result = parseTel(key, value);
        expect(result.pref).toBeUndefined();
    });
});
