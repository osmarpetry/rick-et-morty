/**
 * Internationalization Configuration
 * Supports English, German, and French
 */

import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'de', 'fr'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid, default to 'en' instead of throwing notFound()
  const validLocale: string = locales.includes(locale as any) ? locale! : 'en';

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
