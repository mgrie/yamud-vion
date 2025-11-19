import { parseAddress } from '../src/parse';

describe('parseAddress', () => {
    it('should parse ADR with TYPE and PREF', () => {
        const key = 'ADR;TYPE=home;PREF=1';
        const value = ';;Musterstraße 1;Musterstadt;Bayern;12345;Deutschland';
        const result = parseAddress(key, value);
        expect(result).toEqual({
            type: 'home',
            pref: 1,
            street: 'Musterstraße 1',
            city: 'Musterstadt',
            region: 'Bayern',
            postalCode: '12345',
            country: 'Deutschland',
        });
    });

    it('should parse ADR with LABEL only', () => {
        const key = 'ADR;LABEL=Privatadresse';
        const value = ';;Straße 2;Stadt;Region;54321;Land';
        const result = parseAddress(key, value);
        expect(result).toEqual({
            label: 'Privatadresse',
            street: 'Straße 2',
            city: 'Stadt',
            region: 'Region',
            postalCode: '54321',
            country: 'Land',
        });
    });

    it('should parse ADR with no parameters', () => {
        const key = 'ADR';
        const value = ';;Straße 3;Ort;;;Land';
        const result = parseAddress(key, value);
        expect(result).toEqual({
            street: 'Straße 3',
            city: 'Ort',
            country: 'Land',
        });
    });

    it('should ignore invalid PREF values', () => {
        const key = 'ADR;PREF=abc';
        const value = ';;Straße 4;Ort;;;Land';
        const result = parseAddress(key, value);
        expect(result.pref).toBeUndefined();
    });
});
