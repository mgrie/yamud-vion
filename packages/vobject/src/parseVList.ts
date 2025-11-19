import {VList, VListMember} from "./types";
import {isVList} from "./utils";

export function parseVList(raw: string): VList {
    if (!isVList(raw)) throw new Error('Invalid VLIST: must contain exactly one BEGIN:VLIST and END:VLIST');

    const lines = raw.split(/\r?\n/).map(l => l.trim());
    const result: VList = { members: [], custom: {} };

    for (const line of lines) {
        if (line.startsWith('UID:')) result.uid = line.slice(4);
        else if (line.startsWith('VERSION:')) result.version = line.slice(8);
        else if (line.startsWith('FN:')) result.fn = line.slice(3);
        else if (line.startsWith('CARD;')) {
            const [params, href] = line.split(':');
            const uid = href?.replace(/\.vcf$/, '');
            const member: VListMember = { uid };
            params.split(';').slice(1).forEach(part => {
                const [key, value] = part.split('=');
                if (key === 'EMAIL') member.email = value;
                else if (key === 'FN') member.fn = value;
            });
            result.members?.push(member);
        } else if (line.startsWith('X-')) {
            const [key, value] = line.split(':');
            result.custom![key] = value;
        }
    }

    return result;
}
