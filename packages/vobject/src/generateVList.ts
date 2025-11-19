import type { VList } from './types';

export function generateVList(vlist: VList): string {
    const lines: string[] = ['BEGIN:VLIST'];

    if (vlist.uid) lines.push(`UID:${vlist.uid}`);
    lines.push(`VERSION:${vlist.version ?? '1.0'}`);
    if (vlist.fn) lines.push(`FN:${vlist.fn}`);

    vlist.members?.forEach(({ uid, fn, email }) => {
        const params: string[] = [];
        if (email) params.push(`EMAIL=${email}`);
        if (fn) params.push(`FN=${fn}`);
        lines.push(`CARD;${params.join(';')}:${uid}.vcf`);
    });

    if (vlist.custom) {
        for (const [key, value] of Object.entries(vlist.custom)) {
            lines.push(`${key}:${value}`);
        }
    }

    lines.push('END:VLIST');
    return lines.join('\r\n');
}
