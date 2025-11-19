import { parseVCard } from '../src';
import { generateVCard } from '../src';
import type { VCard } from '../src';

describe('vCard roundtrip (v3.0)', () => {
    it('should preserve data through parse → generate → parse (v3.0)', () => {
        const original = `
BEGIN:VCARD
VERSION:3.0
UID:abc-123
FN:Max Mustermann
N:Mustermann;Max;Karl;Dr.;PhD
NICKNAME:Maxi
BDAY:1980-01-01
ORG:Musterfirma;Entwicklung
TITLE:Entwickler
ROLE:Lead Engineer
REV:2023-10-10T12:00:00Z
X-LANG:de
X-TZ:+01:00
PHOTO;TYPE=image/jpeg:https://example.com/photo.jpg
EMAIL;TYPE=home:max@example.com
TEL;TYPE=cell:+49123456789
ADR;TYPE=home:;;Musterstraße 1;Musterstadt;BY;12345;Germany
CATEGORIES:friend,team
NOTE:Testeintrag
X-GEO:48.13743;11.57549
X-SOGO-TYPE:local
END:VCARD
`.trim();

        const parsed: VCard = parseVCard(original);
        const regenerated = generateVCard(parsed, { version: '3.0' });
        const reparsed: VCard = parseVCard(regenerated);

        expect(reparsed).toEqual(parsed);
    });
});

describe('vCard roundtrip (v4.0)', () => {
    it('should preserve data through parse → generate → parse (v4.0)', () => {
        const original = `
BEGIN:VCARD
VERSION:4.0
UID:abc-456
FN:Erika Beispiel
N:Beispiel;Erika;;;
NICKNAME:Eri
BDAY:1990-05-15
ANNIVERSARY:2015-06-20
GENDER:F
KIND:individual
ORG:Beispiel GmbH;Marketing
TITLE:Managerin
ROLE:Team Lead
REV:2023-11-01T08:00:00Z
LANG:de
TZ:+02:00
PHOTO;TYPE=image/png:https://example.com/photo.png
EMAIL;TYPE=work;PREF=1:erika@firma.de
TEL;TYPE=cell;PREF=1:+4915112345678
ADR;TYPE=work;PREF=1:;;Beispielweg 2;Beispielstadt;BE;54321;Germany
CATEGORIES:vip,internal
NOTE:Roundtrip-Test
GEO:52.5200;13.4050
IMPP;TYPE=xmpp:xmpp:erika@example.com
RELATED;TYPE=colleague:urn:uuid:5678
X-CUSTOM-FIELD:foobar
END:VCARD
`.trim();

        const parsed: VCard = parseVCard(original);
        const regenerated = generateVCard(parsed, { version: '4.0' });
        const reparsed: VCard = parseVCard(regenerated);

        expect(reparsed).toEqual(parsed);
    });
});
