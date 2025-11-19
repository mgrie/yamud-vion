import { parseNickname } from '../src/parse';

describe('parseNickname', () => {
    it('should split and trim nicknames', () => {
        expect(parseNickname('Maxi, Mäxchen')).toEqual(['Maxi', 'Mäxchen']);
    });

    it('should remove empty entries', () => {
        expect(parseNickname('Maxi,, ,Mäx')).toEqual(['Maxi', 'Mäx']);
    });

    it('should handle single nickname', () => {
        expect(parseNickname('Mäx')).toEqual(['Mäx']);
    });

    it('should return empty array for empty string', () => {
        expect(parseNickname('')).toEqual([]);
    });
});
