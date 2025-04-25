
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import LocalDictionary from "@/components/common/LocalDictionary";
import { getDictionary } from '@/lib/i18n';
import type { Locale} from '@/types';
import { Dictionary } from '@/types';

import type { Metadata } from 'next';

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return {
        title: {
            default: dict.pages.home.title,
            template: `%s | ${dict.pages.home.title}`,
        },
        description: dict.pages.home.subtitle,
    };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;
    return (
        <LocalDictionary locale={locale}>
            {(dict) => (
                <>
                    <Header dict={dict} locale={locale} />
                    <main className="flex-grow">{children}</main>
                    <Footer dict={dict} locale={locale} />
                </>
            )}
        </LocalDictionary>
    );
}