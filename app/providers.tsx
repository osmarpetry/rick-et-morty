'use client';

import type { ThemeProviderProps } from 'next-themes';

import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client/react';

import client, { persistor } from '@/lib/apollo-client';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [cacheRestored, setCacheRestored] = React.useState(false);

  React.useEffect(() => {
    // Wait for cache to be restored before rendering
    if (persistor) {
      persistor
        .then(() => {
          setCacheRestored(true);
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error('Error restoring cache:', error);
          setCacheRestored(true); // Continue even if cache restoration fails
        });
    } else {
      setCacheRestored(true);
    }
  }, []);

  // Show loading state while cache is being restored
  if (!cacheRestored) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </ApolloProvider>
  );
}
