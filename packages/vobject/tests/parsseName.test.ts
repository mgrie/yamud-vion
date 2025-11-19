import { parseName } from '../src/parse';

describe('parseName', () => {
    it('should parse full name with all components', () => {
        const input = 'Mustermann;Max;Karl,Heinz;Dr.;PhD';
        const result = parseName(input);
        expect(result).toEqual({
            lastName: 'Mustermann',
            firstName: 'Max',
            additionalNames: ['Karl', 'Heinz'],
            honorificPrefixes: ['Dr.'],
            honorificSuffixes: ['PhD'],
        });
    });

    it('should parse name with only first and last', () => {
        const input = 'Doe;Jane';
        const result = parseName(input);
        expect(result).toEqual({
            lastName: 'Doe',
            firstName: 'Jane',
        });
    });

    it('should ignore empty components', () => {
        const input = 'Smith;John;;;;';
        const result = parseName(input);
        expect(result).toEqual({
            lastName: 'Smith',
            firstName: 'John',
        });
    });

    it('should handle additional names only', () => {
        const input = 'Müller;Laura;Anna-Lena';
        const result = parseName(input);
        expect(result).toEqual({
            lastName: 'Müller',
            firstName: 'Laura',
            additionalNames: ['Anna-Lena'],
        });
    });
});
