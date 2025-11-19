import { parseImpp } from '../src/parse';

describe('parseImpp', () => {
    it('should parse IMPP with TYPE and LABEL', () => {
        const key = 'IMPP;TYPE=home;LABEL=Jabber';
        const value = 'xmpp:max@example.com';
        const result = parseImpp(key, value);
        expect(result).toEqual({
            value: 'xmpp:max@example.com',
            type: 'home',
            label: 'Jabber',
        });
    });

    it('should parse IMPP with no parameters', () => {
        const key = 'IMPP';
        const value = 'skype:max.mustermann';
        const result = parseImpp(key, value);
        expect(result).toEqual({
            value: 'skype:max.mustermann',
        });
    });

    it('should trim and parse IMPP', () => {
        const key = 'IMPP;TYPE=work';
        const value = '  matrix:max@matrix.org  ';
        const result = parseImpp(key, value.trim());
        expect(result).toEqual({
            value: 'matrix:max@matrix.org',
            type: 'work',
        });
    });
});
