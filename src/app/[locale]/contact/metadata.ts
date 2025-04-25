
import { getDictionary, locales } from '@/lib/i18n';
import type { Locale } from '@/types';

import type { Metadata } from 'next';

interface MetadataProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    // Validate the locale parameter
    if (!locales.includes(params.locale as Locale)) {
        return {
            title: 'Error',
            description: 'Invalid locale',
        };
    }

    const dict = await getDictionary(params.locale);

    return {
        title: dict.pages.contact.title,
        description: dict.pages.contact.subtitle,
    };
}