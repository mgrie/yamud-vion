import { parseGeo } from '../src/parse';

describe('parseGeo', () => {
    it('should parse valid GEO coordinates', () => {
        const input = '48.137154;11.576124';
        const result = parseGeo(input);
        expect(result).toEqual({
            latitude: 48.137154,
            longitude: 11.576124,
        });
    });

    it('should trim and parse coordinates', () => {
        const input = ' 48.1 ; 11.5 ';
        const result = parseGeo(input);
        expect(result).toEqual({
            latitude: 48.1,
            longitude: 11.5,
        });
    });

    it('should return undefined for invalid GEO', () => {
        const input = 'abc;11.5';
        const result = parseGeo(input);
        expect(result).toBeUndefined();
    });

    it('should return undefined for missing values', () => {
        const input = '48.1;';
        const result = parseGeo(input);
        expect(result).toBeUndefined();
    });
});
