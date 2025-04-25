import type { Locale, Dictionary } from '@/types';

export const defaultLocale: Locale = 'de';
export const locales: Locale[] = ['de', 'en'];

export function getLocaleFromPath(pathname: string): Locale {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (locales.includes(firstSegment as Locale)) {
        return firstSegment as Locale;
    }

    return defaultLocale;
}

export function getLocalizedPath(path: string, locale: Locale): string {
    // If the path already starts with the locale, return it
    if (path.startsWith(`/${locale}`)) {
        return path;
    }

    // Remove any existing locale prefix from the path
    let cleanPath = path;
    for (const loc of locales) {
        if (path.startsWith(`/${loc}/`) || path === `/${loc}`) {
            cleanPath = path.replace(`/${loc}`, '');
            break;
        }
    }

    // Make sure the path starts with a slash
    if (!cleanPath.startsWith('/')) {
        cleanPath = `/${cleanPath}`;
    }

    // Add the new locale prefix
    return `/${locale}${cleanPath}`;
}

export async function getDictionary(locale: Locale | string): Promise<Dictionary> {
    // Ensure locale is valid and is one of our supported locales
    if (!locale || typeof locale !== 'string' || !locales.includes(locale as Locale)) {
        console.warn(`Invalid locale provided to getDictionary: ${locale}, falling back to default`);
        locale = defaultLocale;
    }

    // Safeguard against non-locale paths like favicon.ico
    if (!locales.includes(locale as Locale)) {
        locale = defaultLocale;
    }

    try {
        return (await import(`../../public/locales/${locale}/common.json`)).default as Dictionary;
    } catch (error) {
        console.error(`Error loading dictionary for locale ${locale}:`, error);
        // Fallback to default language
        return (await import(`../../public/locales/${defaultLocale}/common.json`)).default as Dictionary;
    }
}