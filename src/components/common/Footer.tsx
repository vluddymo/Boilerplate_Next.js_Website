import Link from 'next/link';
import { Locale, Dictionary } from '@/types';

interface FooterProps {
    locale: Locale;
    dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p>&copy; {year} {dict.common.footer.rights}</p>
                    </div>

                    <div className="flex space-x-6">
                        <Link
                            href={`/${locale}/privacy`}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            {dict.common.footer.privacy}
                        </Link>
                        <Link
                            href={`/${locale}/terms`}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            {dict.common.footer.terms}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}