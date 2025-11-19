import { generateVList } from '../src/generateVList';
import type { VList } from '../src/types';

describe('generateVList', () => {
    it('should generate a valid VLIST string', () => {
        const input: VList = {
            uid: 'vlist-abc.vcf',
            version: '1.0',
            fn: 'Testgruppe',
            members: [
                { uid: '123', fn: 'Test Person', email: 'test@example.com' },
                { uid: '456', fn: 'Zweite Person' },
            ],
            custom: {
                'X-SYNC-HASH': 'deadbeef',
            },
        };

        const output = generateVList(input);

        expect(output).toContain('BEGIN:VLIST');
        expect(output).toContain('UID:vlist-abc.vcf');
        expect(output).toContain('VERSION:1.0');
        expect(output).toContain('FN:Testgruppe');
        expect(output).toContain('CARD;EMAIL=test@example.com;FN=Test Person:123.vcf');
        expect(output).toContain('CARD;FN=Zweite Person:456.vcf');
        expect(output).toContain('X-SYNC-HASH:deadbeef');
        expect(output).toContain('END:VLIST');
    });
});
