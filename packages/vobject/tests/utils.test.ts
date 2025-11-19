import {isVCard, isVList} from '../src/utils';

const validVCard = `
BEGIN:VCARD
VERSION:3.0
UID:6f4f16e6-910d-51dd-99d4-060653f98d5d
FN:Max Mustermann
N:Mustermann;Max
REV:20251028T105954Z
X-SYNC-HASH:cfd3d947791963d5a8ea832da4672f3d
ROLE:Kommandant
ADR;TYPE=home:;;Musterstraße 1;Musterstadt;;12345;Deutschland
TEL;TYPE=cell:+491234567890
EMAIL:max@example.com
CATEGORIES: Aktive Mitglieder, Atemschutz
END:VCARD
`;

const validVList = `
BEGIN:VLIST
UID:vlist-ad1bacd653640e7d0af18feb92ac78aa.vcf
VERSION:1.0
FN:Atemschutz
CARD;EMAIL=max@example.com;FN=Max Mustermann:6f4f16e6-910d-51dd-99d4-060653f98d5d.vcf
CARD;EMAIL=erika@example.com;FN=Erika Musterfrau:1c1080e6-1c5c-559f-af2c-329b8f767d4b.vcf
CARD;EMAIL=jane.doe@example.com;FN=Jane Doe:76dcf63f-6cb6-5cb2-aad7-af75551aecfa.vcf
CARD;EMAIL=laura.mueller@example.com;FN=Laura Müller:329de3c4-6f45-54cc-85d1-b1b395df3a31.vcf
X-SYNC-HASH:b1c7e81f528ee2d99910cb7875012f38
END:VLIST
`;

describe('isVCard', () => {
    it('should return true for valid vCard input', () => {
        expect(isVCard(validVCard)).toBe(true);
    });

    it('should return false for VLIST or non-vCard input', () => {
        expect(isVCard(validVList)).toBe(false);
    });

    it('should ignore leading whitespace', () => {
        const padded = '   \n\nBEGIN:VCARD\nFN:Test\nEND:VCARD';
        expect(isVCard(padded)).toBe(true);
    });
});

describe('isVList', () => {
    it('should return true for valid vList input', () => {
        expect(isVList(validVList)).toBe(true);
    });

    it('should return false for VLIST or non-vCard input', () => {
        expect(isVList(validVCard)).toBe(false);
    });

    it('should ignore leading whitespace', () => {
        const padded = '   \n\nBEGIN:VLIST\nFN:Test\nEND:VLIST';
        expect(isVList(padded)).toBe(true);
    });
});
