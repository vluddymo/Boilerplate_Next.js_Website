'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { getLocalizedPath } from '@/lib/i18n';

export function LocaleSwitch({ currentLocale }: { currentLocale: Locale }) {
    const pathname = usePathname();

    // Bestimme Ziel-Locale
    const targetLocale: Locale = currentLocale === 'de' ? 'en' : 'de';

    // Konstruiere neuen Pfad
    const newPath = getLocalizedPath(pathname, targetLocale);

    return (
        <Link
            href={newPath}
            className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
            {targetLocale === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
        </Link>
    );
}