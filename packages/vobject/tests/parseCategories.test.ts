import { parseCategories } from '../src/parse';

describe('parseCategories', () => {
    it('should split and trim categories', () => {
        const input = 'friend, work, team';
        expect(parseCategories(input)).toEqual(['friend', 'work', 'team']);
    });

    it('should remove empty entries', () => {
        const input = 'friend,, ,team';
        expect(parseCategories(input)).toEqual(['friend', 'team']);
    });

    it('should handle single category', () => {
        expect(parseCategories('private')).toEqual(['private']);
    });

    it('should return empty array for empty string', () => {
        expect(parseCategories('')).toEqual([]);
    });
});
