/**
 * Root Layout - Rick and Morty App with Internationalization
 * Handles theme, i18n, and navigation without locale-based routing
 */

import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { Link } from '@heroui/link';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import clsx from 'clsx';

import { Providers } from './providers';

import { Navigation } from '@/components/Navigation';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <div className='relative flex flex-col min-h-screen'>
              <Navigation />
              <main className='container mx-auto max-w-7xl px-6 flex-grow py-8'>
                {children}
              </main>
              <footer className='w-full flex items-center justify-center py-3 border-t border-divider'>
                <Link
                  isExternal
                  className='flex items-center gap-1 text-current'
                  href='https://heroui.com?utm_source=next-app-template'
                  title='heroui.com homepage'
                >
                  <span className='text-default-600'>Powered by</span>
                  <p className='text-primary'>HeroUI</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
