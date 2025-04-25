'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { Locale, Dictionary } from '@/types';

import { LocaleSwitch } from './LocaleSwitch';
import { Navigation } from './Navigation';

interface HeaderProps {
    locale: Locale;
    dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link className="flex items-center gap-2" href={`/${locale}`}>
                        <div className="relative w-10 h-10">
                            <Image
                                alt="Logo"
                                height={40}
                                src="/images/logo.svg"
                                width={40}
                            />
                        </div>
                        <span className="font-heading font-bold text-xl text-primary-800">
              Brand Name
            </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Navigation dict={dict} locale={locale} />
                        <LocaleSwitch currentLocale={locale} />
                    </div>
                </div>
            </div>
        </header>
    );
}