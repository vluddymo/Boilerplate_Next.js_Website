'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Locale, Dictionary, NavItem } from '@/types';

interface NavigationProps {
    locale: Locale;
    dict: Dictionary;
}

export function Navigation({ locale, dict }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    const navigation: NavItem[] = [
        { label: dict.common.nav.home, href: `/${locale}` },
        { label: dict.common.nav.about, href: `/${locale}/about` },
        { label: dict.common.nav.contact, href: `/${locale}/contact` },
    ];

    return (
        <div className="relative">
            {/* Mobile menu button */}
            <button
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden p-2 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    />
                </svg>
            </button>

            {/* Mobile navigation */}
            <div className={`md:hidden absolute top-full right-0 w-56 bg-white shadow-lg rounded-lg mt-2 overflow-hidden transition-all transform origin-top-right z-20 ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
                <nav className="py-2">
                    <ul>
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <Link
                                    className={`block px-4 py-2 ${
                                        isActive(item.href) ? 'text-primary-600 font-medium' : 'text-gray-700'
                                    } hover:bg-gray-100`}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:block">
                <ul className="flex space-x-8">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <Link
                                className={`font-medium ${
                                    isActive(item.href) ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                                } transition-colors`}
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}