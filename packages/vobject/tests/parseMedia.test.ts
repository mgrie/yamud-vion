import { parseMedia } from '../src/parse';

describe('parseMedia', () => {
    it('should parse media as URL with type', () => {
        const key = 'PHOTO;TYPE=image/png';
        const value = 'https://example.com/photo.png';
        expect(parseMedia(key, value)).toEqual({
            url: 'https://example.com/photo.png',
            type: 'image/png',
        });
    });

    it('should parse media as URL without type', () => {
        const key = 'LOGO';
        const value = 'https://example.com/logo.svg';
        expect(parseMedia(key, value)).toEqual({
            url: 'https://example.com/logo.svg',
        });
    });

    it('should parse media as base64 with type', () => {
        const key = 'SOUND;ENCODING=b;TYPE=audio/wav';
        const value = 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=';
        expect(parseMedia(key, value)).toEqual({
            data: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=',
            type: 'audio/wav',
        });
    });

    it('should parse media as base64 without type', () => {
        const key = 'PHOTO;ENCODING=b';
        const value = 'iVBORw0KGgoAAAANSUhEUgAAAAUA';
        expect(parseMedia(key, value)).toEqual({
            data: 'iVBORw0KGgoAAAANSUhEUgAAAAUA',
        });
    });

    it('should trim value for URL', () => {
        const key = 'LOGO';
        const value = '  https://logo.net  ';
        expect(parseMedia(key, value)).toEqual({
            url: 'https://logo.net',
        });
    });

    it('should trim value for base64', () => {
        const key = 'PHOTO;ENCODING=b';
        const value = '  BASE64DATA==  ';
        expect(parseMedia(key, value)).toEqual({
            data: 'BASE64DATA==',
        });
    });

    it('should handle mixed casing in parameters', () => {
        const key = 'PHOTO;encoding=B;Type=image/jpeg';
        const value = 'BASE64DATA==';
        expect(parseMedia(key, value)).toEqual({
            data: 'BASE64DATA==',
            type: 'image/jpeg',
        });
    });

    it('should ignore unrelated parameters', () => {
        const key = 'PHOTO;FOO=bar;ENCODING=b;TYPE=image/gif';
        const value = 'GIFDATA==';
        expect(parseMedia(key, value)).toEqual({
            data: 'GIFDATA==',
            type: 'image/gif',
        });
    });

    it('should return empty object for empty input', () => {
        const key = 'PHOTO';
        const value = '';
        expect(parseMedia(key, value)).toEqual({
            url: '',
        });
    });
});
