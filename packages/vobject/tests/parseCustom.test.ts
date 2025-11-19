import { parseCustom } from '../src/parse';

describe('parseCustom', () => {
    it('should parse X- field', () => {
        expect(parseCustom('X-FAVORITE-COLOR', 'blue')).toEqual(['X-FAVORITE-COLOR', 'blue']);
    });

    it('should parse CUSTOM field', () => {
        expect(parseCustom('CUSTOM1', 'foobar')).toEqual(['CUSTOM1', 'foobar']);
    });

    it('should parse SOGo extension', () => {
        expect(parseCustom('X-SOGO-TYPE', 'work')).toEqual(['X-SOGO-TYPE', 'work']);
    });

    it('should ignore standard fields', () => {
        expect(parseCustom('FN', 'Max Mustermann')).toBeUndefined();
    });

    it('should trim key and value', () => {
        expect(parseCustom('  X-FOO  ', '  bar  ')).toEqual(['X-FOO', 'bar']);
    });
});
