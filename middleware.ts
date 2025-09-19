/**
 * Next.js Middleware for Internationalization
 * Handles locale detection without URL changes
 */

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Never show the locale in the URL - keep URLs clean
  localePrefix: 'never',
});

export const config = {
  // Match all pathnames except API routes and static files
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
