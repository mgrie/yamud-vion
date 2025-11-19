import { parseVList } from '../src/parseVList';
import { generateVList } from '../src/generateVList';
import type { VList } from '../src/types';

describe('VLIST roundtrip', () => {
    it('should preserve structure through parse → generate → parse', () => {
        const original = `
BEGIN:VLIST
UID:vlist-abc.vcf
VERSION:1.0
FN:Testgruppe
CARD;EMAIL=test@example.com;FN=Test Person:123.vcf
CARD;FN=Zweite Person:456.vcf
X-SYNC-HASH:deadbeef
END:VLIST
`.trim();

        const parsed: VList = parseVList(original);
        const regenerated = generateVList(parsed);
        const reparsed: VList = parseVList(regenerated);

        expect(reparsed).toEqual(parsed);
    });
});
