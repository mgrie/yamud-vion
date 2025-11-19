export interface VCard {
    version?: string;
    uid?: string;
    fn?: string;
    n?: NameEntry;
    nickname?: string[];
    bday?: string; // ISO 8601 format
    anniversary?: string; // ISO 8601 format
    gender?: 'M' | 'F' | 'O' | 'N' | 'U';
    kind?: 'individual' | 'group' | 'org' | 'location';
    org?: OrgEntry[];
    title?: string;
    role?: string;
    rev?: string; // ISO 8601 format
    language?: string;
    timezone?: string;
    photo?: MediaEntry;
    logo?: MediaEntry;
    sound?: MediaEntry;
    url?: UrlEntry[];
    email?: EmailEntry[];
    tel?: TelEntry[];
    address?: AddressEntry[];
    categories?: string[];
    note?: string;
    geo?: {
        latitude: number;
        longitude: number;
    };
    impp?: ImppEntry[];
    related?: RelatedEntry[];
    custom?: Record<string, string>; // X-Fields, CUSTOM1, etc.
}

export interface NameEntry {
    lastName?: string;
    firstName?: string;
    additionalNames?: string[];
    honorificPrefixes?: string[];
    honorificSuffixes?: string[];
}

export interface EmailEntry {
    value: string;
    type?: string;
    label?: string;
    pref?: number;
}

export interface TelEntry {
    value: string;
    type?: string;
    label?: string;
    pref?: number;
}

export interface AddressEntry {
    type?: string;
    label?: string;
    pref?: number;
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
}

export interface OrgEntry {
    name: string;
    unit?: string;
}

export interface MediaEntry {
    url?: string;
    data?: string; // base64
    type?: string; // MIME type
}

export interface RelatedEntry {
    value: string;
    type?: string; // e.g. "spouse", "child", "colleague"
}

export interface UrlEntry {
    value: string;
    type?: string;
    label?: string;
}

export interface ImppEntry {
    value: string;
    type?: string;
    label?: string;
}

export interface VList {
    uid?: string;
    version?: string; // default: "1.0"
    fn?: string;
    members?: VListMember[];
    custom?: Record<string, string>; // z. B. X-SYNC-HASH
}

export interface VListMember {
    uid: string;
    fn?: string;
    email?: string;
}
