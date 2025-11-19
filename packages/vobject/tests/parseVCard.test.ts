import { parseVCard } from '../src';
import type { VCard } from '../src';

describe('parseVCard', () => {
    it('should parse a full vCard with mixed fields', () => {
        const input = `
VERSION:4.0
FN:Max Mustermann
N:Mustermann;Max;;;
NICKNAME:Maxi,Mäx
BDAY:19800101
ANNIVERSARY:20101231
GENDER:M
KIND:individual
EMAIL;TYPE=home:max@example.com
EMAIL;TYPE=work:max@company.com
TEL;TYPE=cell:+49123456789
TEL;TYPE=work:+49987654321
ADR;TYPE=home:;;Musterstraße 1;Musterstadt;;12345;Germany
ORG:Musterfirma
TITLE:Entwickler
ROLE:Lead Engineer
REV:20231010T120000Z
LANG:de
TZ:+01:00
PHOTO;TYPE=image/png:https://example.com/photo.png
LOGO;ENCODING=b;TYPE=image/svg+xml:BASE64LOGO==
SOUND;ENCODING=b;TYPE=audio/wav:BASE64SOUND==
URL:https://example.com
CATEGORIES:friend,team
NOTE:Testeintrag
GEO:48.13743;11.57549
IMPP:xmpp:max@example.com
RELATED;TYPE=friend:urn:uuid:1234
X-SOGO-TYPE:local
`;

        const result: VCard = parseVCard(input);

        expect(result.version).toBe('4.0');
        expect(result.fn).toBe('Max Mustermann');
        expect(result.n).toEqual({
            lastName: 'Mustermann',
            firstName: 'Max'
        });

        expect(result.nickname).toEqual(['Maxi', 'Mäx']);
        expect(result.bday).toBe('1980-01-01');
        expect(result.anniversary).toBe('2010-12-31');
        expect(result.gender).toBe('M');
        expect(result.kind).toBe('individual');
        expect(result.email).toEqual([
            { value: 'max@example.com', type: 'home' },
            { value: 'max@company.com', type: 'work' },
        ]);
        expect(result.tel).toEqual([
            { value: '+49123456789', type: 'cell' },
            { value: '+49987654321', type: 'work' },
        ]);
        expect(result.address?.[0]?.street).toBe('Musterstraße 1');
        expect(result.org).toEqual([{ name: 'Musterfirma' }]);

        expect(result.title).toBe('Entwickler');
        expect(result.role).toBe('Lead Engineer');
        expect(result.rev).toBe('20231010T120000Z');
        expect(result.language).toBe('de');
        expect(result.timezone).toBe('+01:00');
        expect(result.photo).toEqual({
            url: 'https://example.com/photo.png',
            type: 'image/png',
        });
        expect(result.logo).toEqual({
            data: 'BASE64LOGO==',
            type: 'image/svg+xml',
        });
        expect(result.sound).toEqual({
            data: 'BASE64SOUND==',
            type: 'audio/wav',
        });
        expect(result.url).toEqual([{ value: 'https://example.com' }]);
        expect(result.categories).toEqual(['friend', 'team']);
        expect(result.note).toBe('Testeintrag');
        expect(result.geo).toEqual({
            latitude: 48.13743,
            longitude: 11.57549,
        });
        expect(result.impp).toEqual([{ value: 'xmpp:max@example.com' }]);
        expect(result.related).toEqual([{ value: 'urn:uuid:1234', type: 'friend' }]);
        expect(result.custom?.['X-SOGO-TYPE']).toBe('local');
    });
});
