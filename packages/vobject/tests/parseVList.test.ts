import { parseVList } from '../src/parseVList';

describe('parseVList', () => {
    it('should parse a VLIST string into structured data', () => {
        const input = `
BEGIN:VLIST
UID:vlist-abc.vcf
VERSION:1.0
FN:Testgruppe
CARD;EMAIL=test@example.com;FN=Test Person:123.vcf
CARD;FN=Zweite Person:456.vcf
X-SYNC-HASH:deadbeef
END:VLIST
`.trim();

        const result = parseVList(input);

        expect(result.uid).toBe('vlist-abc.vcf');
        expect(result.version).toBe('1.0');
        expect(result.fn).toBe('Testgruppe');
        expect(result.members?.length).toBe(2);
        expect(result.members?.[0]).toEqual({
            uid: '123',
            fn: 'Test Person',
            email: 'test@example.com',
        });
        expect(result.members?.[1]).toEqual({
            uid: '456',
            fn: 'Zweite Person',
        });
        expect(result.custom?.['X-SYNC-HASH']).toBe('deadbeef');
    });
});
