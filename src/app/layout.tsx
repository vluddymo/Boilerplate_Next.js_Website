// src/app/layout.tsx
import '../styles/globals.css';
import React from "react";

import { Inter, Montserrat } from 'next/font/google';

import type { Metadata } from 'next';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Next.js Multilingual Starter',
        template: '%s | Next.js Multilingual Starter',
    },
    description: 'A starter template for Next.js with TypeScript, Tailwind CSS, and i18n',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    return (
        <html suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`} lang="de">
        <body className="min-h-screen bg-gray-50">
        {children}
        </body>
        </html>
    );
}