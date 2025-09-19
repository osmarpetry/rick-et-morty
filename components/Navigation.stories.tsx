/**
 * Navigation Storybook Stories
 * Visual tests for the Rick and Morty themed navigation component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

import { Navigation } from './Navigation';

// Mock messages for Storybook
const messages = {
  navigation: {
    home: 'Home',
    characters: 'Characters',
    episodes: 'Episodes',
    locations: 'Locations',
  },
};

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Rick and Morty themed navigation bar with gradient styling, language switcher, and theme toggle.',
      },
    },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider locale='en' messages={messages}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <div className='min-h-screen bg-background'>
            <Story />
            <div className='p-8'>
              <h1 className='text-2xl font-bold mb-4'>Sample Content</h1>
              <p className='text-default-600'>
                This shows how the navigation looks with content below it.
              </p>
            </div>
          </div>
        </ThemeProvider>
      </NextIntlClientProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
  name: 'Light Theme',
  parameters: {
    backgrounds: { default: 'rick-morty-light' },
  },
};

export const DarkTheme: Story = {
  name: 'Dark Theme',
  parameters: {
    backgrounds: { default: 'rick-morty-dark' },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider locale='en' messages={messages}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <div className='min-h-screen bg-background dark'>
            <Story />
            <div className='p-8'>
              <h1 className='text-2xl font-bold mb-4'>Sample Content</h1>
              <p className='text-default-600'>
                This shows how the navigation looks with content below it in
                dark mode.
              </p>
            </div>
          </div>
        </ThemeProvider>
      </NextIntlClientProvider>
    ),
  ],
};

export const GermanLocale: Story = {
  name: 'German Locale',
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='de'
        messages={{
          navigation: {
            home: 'Startseite',
            characters: 'Charaktere',
            episodes: 'Episoden',
            locations: 'Orte',
          },
        }}
      >
        <ThemeProvider attribute='class' defaultTheme='light'>
          <div className='min-h-screen bg-background'>
            <Story />
            <div className='p-8'>
              <h1 className='text-2xl font-bold mb-4'>Beispielinhalt</h1>
              <p className='text-default-600'>
                Dies zeigt, wie die Navigation mit deutschem Text aussieht.
              </p>
            </div>
          </div>
        </ThemeProvider>
      </NextIntlClientProvider>
    ),
  ],
};

export const FrenchLocale: Story = {
  name: 'French Locale',
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='fr'
        messages={{
          navigation: {
            home: 'Accueil',
            characters: 'Personnages',
            episodes: 'Épisodes',
            locations: 'Lieux',
          },
        }}
      >
        <ThemeProvider attribute='class' defaultTheme='light'>
          <div className='min-h-screen bg-background'>
            <Story />
            <div className='p-8'>
              <h1 className='text-2xl font-bold mb-4'>
                Contenu d&apos;exemple
              </h1>
              <p className='text-default-600'>
                Ceci montre comment la navigation apparaît avec du texte
                français.
              </p>
            </div>
          </div>
        </ThemeProvider>
      </NextIntlClientProvider>
    ),
  ],
};
