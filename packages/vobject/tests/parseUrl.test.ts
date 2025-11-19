import { parseUrl } from '../src/parse';

describe('parseUrl', () => {
    it('should parse URL with TYPE and LABEL', () => {
        const key = 'URL;TYPE=work;LABEL=Homepage';
        const value = 'https://company.com';
        const result = parseUrl(key, value);
        expect(result).toEqual({
            value: 'https://company.com',
            type: 'work',
            label: 'Homepage',
        });
    });

    it('should parse URL with no parameters', () => {
        const key = 'URL';
        const value = 'https://example.com';
        const result = parseUrl(key, value);
        expect(result).toEqual({
            value: 'https://example.com',
        });
    });

    it('should trim and parse URL', () => {
        const key = 'URL;TYPE=personal';
        const value = '  https://me.net  ';
        const result = parseUrl(key, value.trim());
        expect(result).toEqual({
            value: 'https://me.net',
            type: 'personal',
        });
    });
});
