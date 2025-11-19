import { parseOrg } from '../src/parse';

describe('parseOrg', () => {
    it('should parse ORG with name and unit', () => {
        const input = 'Acme Corp;Engineering';
        const result = parseOrg(input);
        expect(result).toEqual({
            name: 'Acme Corp',
            unit: 'Engineering',
        });
    });

    it('should parse ORG with name only', () => {
        const input = 'Solo GmbH';
        const result = parseOrg(input);
        expect(result).toEqual({
            name: 'Solo GmbH',
        });
    });

    it('should trim whitespace', () => {
        const input = '  Firma XY  ;  Vertrieb  ';
        const result = parseOrg(input);
        expect(result).toEqual({
            name: 'Firma XY',
            unit: 'Vertrieb',
        });
    });

    it('should handle empty unit gracefully', () => {
        const input = 'Firma Z;';
        const result = parseOrg(input);
        expect(result).toEqual({
            name: 'Firma Z',
        });
    });
});
