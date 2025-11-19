import type { VCard } from './types';

export function generateVCard(
    vcard: VCard,
    options?: { version?: '3.0' | '4.0' }
): string {
    const version = options?.version ?? '3.0';
    const lines: string[] = ['BEGIN:VCARD', `VERSION:${version}`];

    const newline = version === '3.0' ? '\r\n' : '\n';

    const push = (line: string | undefined | null | false) => {
        if (line) lines.push(line);
    };

    push(vcard.uid && `UID:${vcard.uid}`);
    push(vcard.fn && `FN:${vcard.fn}`);

    if (vcard.n) {
        const {
            lastName = '',
            firstName = '',
            additionalNames = [],
            honorificPrefixes = [],
            honorificSuffixes = [],
        } = vcard.n;
        push(
            `N:${lastName};${firstName};${additionalNames.join(',')};${honorificPrefixes.join(',')};${honorificSuffixes.join(',')}`
        );
    }

    if (vcard.nickname?.length) push(`NICKNAME:${vcard.nickname.join(',')}`);
    if (vcard.bday) push(`BDAY:${vcard.bday}`);
    if (version === '4.0' && vcard.anniversary) push(`ANNIVERSARY:${vcard.anniversary}`);
    if (version === '4.0' && vcard.kind) push(`KIND:${vcard.kind}`);
    if (vcard.gender) push(`GENDER:${vcard.gender}`);

    vcard.org?.forEach(({ name, unit }) => {
        const parts = [name, unit].filter((p): p is string => !!p);
        if (parts.length > 0) {
            push(`ORG:${parts.join(';')}`);
        }
    });

    push(vcard.title && `TITLE:${vcard.title}`);
    push(vcard.role && `ROLE:${vcard.role}`);
    push(vcard.rev && `REV:${vcard.rev}`);
    push(vcard.language && (version === '4.0' ? `LANG:${vcard.language}` : `X-LANG:${vcard.language}`));
    push(vcard.timezone && (version === '4.0' ? `TZ:${vcard.timezone}` : `X-TZ:${vcard.timezone}`));

    const media = (tag: string, entry?: VCard['photo']) => {
        if (!entry) return;
        const params: string[] = [];
        if (entry.type) params.push(`TYPE=${entry.type}`);
        if (entry.data) params.push('ENCODING=b');
        const key = [tag, ...params].join(';');
        const value = entry.data ?? entry.url;

        if (value) push(`${key}:${value}`);
    };

    media('PHOTO', vcard.photo);
    media('LOGO', vcard.logo);
    media('SOUND', vcard.sound);

    const multi = (tag: string, entries?: { value: string; type?: string; label?: string; pref?: number }[]) => {
        entries?.forEach(({ value, type, label, pref }) => {
            const params: string[] = [];
            if (type) params.push(`TYPE=${type}`);
            if (label) params.push(`LABEL=${label}`);
            if (version === '4.0' && pref !== undefined) params.push(`PREF=${pref}`);
            const key = [tag, ...params].join(';');
            push(`${key}:${value}`);
        });
    };

    multi('EMAIL', vcard.email);
    multi('TEL', vcard.tel);
    multi('URL', vcard.url);
    multi('IMPP', version === '4.0' ? vcard.impp : undefined);

    vcard.address?.forEach(({ type, label, pref, street, city, region, postalCode, country }) => {
        const params: string[] = [];
        if (type) params.push(`TYPE=${type}`);
        if (label) params.push(`LABEL=${label}`);
        if (version === '4.0' && pref !== undefined) params.push(`PREF=${pref}`);
        const key = ['ADR', ...params].join(';');
        const value = [
            '', // PO Box
            '', // Extended
            street ?? '',
            city ?? '',
            region ?? '',
            postalCode ?? '',
            country ?? '',
        ].join(';');
        push(`${key}:${value}`);
    });

    if (vcard.categories?.length) push(`CATEGORIES:${vcard.categories.join(',')}`);
    if (vcard.note) push(`NOTE:${vcard.note}`);

    if (vcard.geo) {
        const geoLine = `GEO:${vcard.geo.latitude};${vcard.geo.longitude}`;
        push(version === '4.0' ? geoLine : `X-GEO:${vcard.geo.latitude};${vcard.geo.longitude}`);
    }

    vcard.related?.forEach(({ value, type }) => {
        if (version === '4.0') {
            const params = type ? `;TYPE=${type}` : '';
            push(`RELATED${params}:${value}`);
        }
    });

    if (vcard.custom) {
        for (const [key, value] of Object.entries(vcard.custom)) {
            push(`${key}:${String(value)}`);
        }
    }

    push('END:VCARD');
    return lines.join(newline);
}
