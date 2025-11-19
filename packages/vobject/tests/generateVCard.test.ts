import { generateVCard } from '../src';
import type { VCard } from '../src';

describe('generateVCard', () => {
    it('should generate a valid vCard 3.0 string', () => {
        const input: VCard = {
            version: '3.0',
            uid: 'abc-123',
            fn: 'Max Mustermann',
            n: {
                lastName: 'Mustermann',
                firstName: 'Max',
                additionalNames: ['Karl'],
                honorificPrefixes: ['Dr.'],
                honorificSuffixes: ['PhD'],
            },
            nickname: ['Maxi'],
            bday: '1980-01-01',
            org: [{ name: 'Musterfirma', unit: 'Entwicklung' }],
            title: 'Entwickler',
            role: 'Lead Engineer',
            rev: '2023-10-10T12:00:00Z',
            language: 'de',
            timezone: '+01:00',
            photo: { url: 'https://example.com/photo.jpg', type: 'image/jpeg' },
            email: [{ value: 'max@example.com', type: 'home' }],
            tel: [{ value: '+49123456789', type: 'cell' }],
            address: [
                {
                    type: 'home',
                    street: 'Musterstraße 1',
                    city: 'Musterstadt',
                    region: 'BY',
                    postalCode: '12345',
                    country: 'Germany',
                },
            ],
            categories: ['friend', 'team'],
            note: 'Testeintrag',
            geo: { latitude: 48.13743, longitude: 11.57549 },
            custom: { 'X-SOGO-TYPE': 'local' },
        };

        const output = generateVCard(input, { version: '3.0' });

        expect(output).toContain('BEGIN:VCARD');
        expect(output).toContain('VERSION:3.0');
        expect(output).toContain('FN:Max Mustermann');
        expect(output).toContain('N:Mustermann;Max;Karl;Dr.;PhD');
        expect(output).toContain('NICKNAME:Maxi');
        expect(output).toContain('BDAY:1980-01-01');
        expect(output).toContain('ORG:Musterfirma;Entwicklung');
        expect(output).toContain('TITLE:Entwickler');
        expect(output).toContain('ROLE:Lead Engineer');
        expect(output).toContain('REV:2023-10-10T12:00:00Z');
        expect(output).toContain('X-LANG:de');
        expect(output).toContain('X-TZ:+01:00');
        expect(output).toContain('PHOTO;TYPE=image/jpeg:https://example.com/photo.jpg');
        expect(output).toContain('EMAIL;TYPE=home:max@example.com');
        expect(output).toContain('TEL;TYPE=cell:+49123456789');
        expect(output).toContain('ADR;TYPE=home:;;Musterstraße 1;Musterstadt;BY;12345;Germany');
        expect(output).toContain('CATEGORIES:friend,team');
        expect(output).toContain('NOTE:Testeintrag');
        expect(output).toContain('X-GEO:48.13743;11.57549');
        expect(output).toContain('X-SOGO-TYPE:local');
        expect(output).toContain('END:VCARD');
    });
});
