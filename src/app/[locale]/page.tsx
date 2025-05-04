import Link from 'next/link';


import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/types';

import type { Metadata } from 'next';

interface HomePageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return {
        title: dict.pages.home.title,
        description: dict.pages.home.subtitle,
    };
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-800">
                            {dict.pages.home.title}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            {dict.pages.home.subtitle}
                        </p>
                        <Link
                            className="btn btn-primary"
                            href={`/${locale}/about`}
                        >
                            {dict.pages.home.cta}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}