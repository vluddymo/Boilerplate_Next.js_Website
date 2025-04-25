import Image from 'next/image';


import { getDictionary, locales } from '@/lib/i18n';
import type { Locale } from '@/types';

import type { Metadata } from 'next';

interface AboutPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
    // Validate the locale parameter
    const { locale } = await params;
    if (!locales.includes(locale as Locale)) {
        return {
            title: 'Error',
            description: 'Invalid locale',
        };
    }

    const dict = await getDictionary(locale);

    return {
        title: dict.pages.about.title,
        description: dict.pages.about.subtitle,
    };
}

export default async function AboutPage({ params }: AboutPageProps) {
    // Validate the locale parameter
    const { locale } =  await params;
    if (!locales.includes(locale as Locale)) {
        return <div>Invalid locale</div>;
    }

    const dict = await getDictionary(locale);

    // Content for each language
    const content = {
        de: {
            title: 'Über uns',
            subtitle: 'Erfahren Sie mehr über unser Unternehmen und unsere Mission.',
            history: {
                title: 'Unsere Geschichte',
                content: 'Unser Unternehmen wurde 2020 mit einer klaren Vision gegründet: Menschen zu helfen, bessere digitale Erlebnisse zu schaffen. Seitdem haben wir mit zahlreichen Kunden zusammengearbeitet und innovative Lösungen entwickelt.',
            },
            mission: {
                title: 'Unsere Mission',
                content: 'Wir streben danach, hochwertige digitale Produkte zu erstellen, die das Leben unserer Nutzer einfacher und angenehmer machen. Unsere Lösungen sind benutzerfreundlich, zugänglich und technisch ausgereift.',
            },
            team: {
                title: 'Unser Team',
                content: 'Unser vielfältiges Team besteht aus talentierten Entwicklern, Designern und Strategen, die ihre Leidenschaft für Technologie und Innovation teilen.',
            },
            values: {
                title: 'Unsere Werte',
                items: [
                    'Qualität: Wir setzen höchste Standards für alles, was wir tun.',
                    'Innovation: Wir suchen ständig nach neuen und besseren Wegen.',
                    'Zusammenarbeit: Wir glauben an die Kraft des Teamworks.',
                    'Integrität: Wir handeln ehrlich und transparent.',
                ],
            },
        },
        en: {
            title: 'About Us',
            subtitle: 'Learn more about our company and our mission.',
            history: {
                title: 'Our History',
                content: 'Our company was founded in 2020 with a clear vision: to help people create better digital experiences. Since then, we have worked with numerous clients and developed innovative solutions.',
            },
            mission: {
                title: 'Our Mission',
                content: 'We strive to create high-quality digital products that make our users\' lives easier and more enjoyable. Our solutions are user-friendly, accessible, and technically sophisticated.',
            },
            team: {
                title: 'Our Team',
                content: 'Our diverse team consists of talented developers, designers, and strategists who share a passion for technology and innovation.',
            },
            values: {
                title: 'Our Values',
                items: [
                    'Quality: We set the highest standards for everything we do.',
                    'Innovation: We constantly look for new and better ways.',
                    'Collaboration: We believe in the power of teamwork.',
                    'Integrity: We act honestly and transparently.',
                ],
            },
        },
    };

    const pageContent = locale === 'de' ? content.de : content.en;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-primary-800">{pageContent.title}</h1>
                    <p className="text-xl text-gray-600">{pageContent.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-primary-700">{pageContent.history.title}</h2>
                        <p className="text-gray-700">{pageContent.history.content}</p>
                    </div>
                    <div className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                            fill
                            alt="Team collaboration"
                            className="object-cover"
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                        />
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-primary-700">{pageContent.mission.title}</h2>
                    <p className="text-gray-700">{pageContent.mission.content}</p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-primary-700">{pageContent.team.title}</h2>
                    <p className="text-gray-700 mb-6">{pageContent.team.content}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="text-center">
                                <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
                                    <Image
                                        fill
                                        alt={`Team member ${index}`}
                                        className="object-cover"
                                        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 10}.jpg`}
                                    />
                                </div>
                                <h3 className="font-medium text-primary-600">
                                    {locale === 'de' ? 'Teammitglied' : 'Team Member'} {index}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {locale === 'de' ? 'Position' : 'Position'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary-700">{pageContent.values.title}</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {pageContent.values.items.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="bg-primary-100 text-primary-700 p-2 rounded-full mr-3 mt-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                    </svg>
                                </div>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}