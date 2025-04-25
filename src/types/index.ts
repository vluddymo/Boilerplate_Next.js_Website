// localization
export type Locale = 'de' | 'en';

// navigation
export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

// meta-data for pages
export interface PageMeta {
    title: string;
    description: string;
}

// dictionary for translations
export interface Dictionary {
    common: {
        nav: {
            home: string;
            about: string;
            contact: string;
        };
        footer: {
            rights: string;
            privacy: string;
            terms: string;
        };
        buttons: {
            readMore: string;
            submit: string;
            cancel: string;
        };
    };
    pages: {
        home: {
            title: string;
            subtitle: string;
            cta: string;
        };
        about: {
            title: string;
            subtitle: string;
        };
        contact: {
            title: string;
            subtitle: string;
            form: {
                name: string;
                email: string;
                message: string;
            };
        };
        notFound: {
            title: string;
            description: string;
            backHome: string;
        };
    };
}