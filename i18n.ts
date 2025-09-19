/**
 * Internationalization Configuration
 * Supports English, German, and French
 */

import { getRequestConfig } from 'next-intl/server';
import { headers, cookies } from 'next/headers';

// Can be imported from a shared config
const locales = ['en', 'de', 'fr'];

export default getRequestConfig(async () => {
  // Get locale from cookie or header, fallback to 'en'
  const cookieStore = await cookies();
  const headersList = await headers();

  const locale =
    cookieStore.get('NEXT_LOCALE')?.value ||
    headersList.get('x-locale') ||
    'en';

  // Validate that the locale is supported
  const validLocale: string = locales.includes(locale) ? locale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
