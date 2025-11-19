import { parseRelated } from '../src/parse';

describe('parseRelated', () => {
    it('should parse RELATED with TYPE', () => {
        const key = 'RELATED;TYPE=spouse';
        const value = 'mailto:partner@example.com';
        const result = parseRelated(key, value);
        expect(result).toEqual({
            value: 'mailto:partner@example.com',
            type: 'spouse',
        });
    });

    it('should parse RELATED with no parameters', () => {
        const key = 'RELATED';
        const value = 'mailto:colleague@example.com';
        const result = parseRelated(key, value);
        expect(result).toEqual({
            value: 'mailto:colleague@example.com',
        });
    });

    it('should trim and parse RELATED', () => {
        const key = 'RELATED;TYPE=manager';
        const value = '  urn:uuid:1234-5678  ';
        const result = parseRelated(key, value.trim());
        expect(result).toEqual({
            value: 'urn:uuid:1234-5678',
            type: 'manager',
        });
    });
});
