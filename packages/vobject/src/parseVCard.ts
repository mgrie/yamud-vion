import type { VCard } from './types';
import {
    parseAddress,
    parseAnniversary,
    parseBday, parseCategories, parseCustom, parseEmail, parseGeo, parseImpp,
    parseKind,
    parseMedia,
    parseName,
    parseNickname,
    parseOrg, parseRelated, parseTel,
    parseUrl
} from "./parse";
import {isVCard} from "./utils";

export function parseVCard(input: string): VCard {
    if (!isVCard(input)) throw new Error('Invalid vCard: must contain exactly one BEGIN:VCARD and END:VCARD');


    const vcard: VCard = {};
    const lines = input.split(/\r?\n/).filter(Boolean);

    for (const line of lines) {
        const [rawKey, ...rest] = line.split(':');
        if (!rawKey || rest.length === 0) continue;

        const rawValue = rest.join(':');
        const key = rawKey.toUpperCase();
        const baseKey = key.split(';')[0];

        switch (baseKey) {
            case 'VERSION':
                vcard.version = rawValue.trim();
                break;
            case 'UID':
                vcard.uid = rawValue.trim();
                break;
            case 'FN':
                vcard.fn = rawValue.trim();
                break;
            case 'N':
                vcard.n = parseName(rawValue);
                break;
            case 'NICKNAME':
                vcard.nickname = parseNickname(rawValue);
                break;
            case 'BDAY':
                vcard.bday = parseBday(rawValue);
                break;
            case 'ANNIVERSARY':
                vcard.anniversary = parseAnniversary(rawValue);
                break;
            case 'GENDER':
                vcard.gender = rawValue.trim().toUpperCase() as VCard['gender'];
                break;
            case 'KIND':
                vcard.kind = parseKind(rawValue);
                break;
            case 'ORG':
                vcard.org ??= [];
                vcard.org.push(parseOrg(rawValue));
                break;
            case 'TITLE':
                vcard.title = rawValue.trim();
                break;
            case 'ROLE':
                vcard.role = rawValue.trim();
                break;
            case 'REV':
                vcard.rev = rawValue.trim();
                break;
            case 'LANG':
            case 'LANGUAGE':
                vcard.language = rawValue.trim();
                break;
            case 'TZ':
            case 'TIMEZONE':
                vcard.timezone = rawValue.trim();
                break;
            case 'PHOTO':
                vcard.photo = parseMedia(rawKey, rawValue);
                break;
            case 'LOGO':
                vcard.logo = parseMedia(rawKey, rawValue);
                break;
            case 'SOUND':
                vcard.sound = parseMedia(rawKey, rawValue);
                break;
            case 'URL':
                vcard.url ??= [];
                vcard.url.push(parseUrl(rawKey, rawValue));
                break;
            case 'EMAIL':
                vcard.email ??= [];
                vcard.email.push(parseEmail(rawKey, rawValue));
                break;
            case 'TEL':
                vcard.tel ??= [];
                vcard.tel.push(parseTel(rawKey, rawValue));
                break;
            case 'ADR':
                vcard.address ??= [];
                vcard.address.push(parseAddress(rawKey, rawValue));
                break;
            case 'CATEGORIES':
                vcard.categories = parseCategories(rawValue);
                break;
            case 'NOTE':
                vcard.note = rawValue.trim();
                break;
            case 'GEO':
                vcard.geo = parseGeo(rawValue);
                break;
            case 'IMPP':
                vcard.impp ??= [];
                vcard.impp.push(parseImpp(rawKey, rawValue));
                break;
            case 'RELATED':
                vcard.related ??= [];
                vcard.related.push(parseRelated(rawKey, rawValue));
                break;
            default: {
                const custom = parseCustom(rawKey, rawValue);
                if (custom) {
                    vcard.custom ??= {};
                    vcard.custom[custom[0]] = custom[1];
                }
                break;
            }
        }
    }

    return vcard;
}
