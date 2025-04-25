import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { locales, defaultLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
    // Get the pathname
    const pathname = request.nextUrl.pathname;

    // Skip middleware for assets, favicon, etc.
    const staticFilesPatterns = [
        /\.ico$/, // favicon.ico
        /\.svg$/,
        /\.jpg$/,
        /\.jpeg$/,
        /\.png$/,
        /\.gif$/,
        /\.webp$/,
        /^\/api\//,
        /^\/static\//,
        /^\/assets\//,
    ];

    if (staticFilesPatterns.some(pattern => pattern.test(pathname))) {
        return NextResponse.next();
    }

    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // If not, redirect to the default locale
    if (!pathnameHasLocale) {
        const locale = defaultLocale;

        // New URL with default locale
        const newUrl = new URL(
            `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`,
            request.url
        );

        // Copy search params
        request.nextUrl.searchParams.forEach((value, key) => {
            newUrl.searchParams.set(key, value);
        });

        return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
}

// Configure middleware matcher
export const config = {
    matcher: [
        // Skip static files
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};