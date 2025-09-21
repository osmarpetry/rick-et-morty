/**
 * LanguageSwitcher Storybook Stories
 * Visual tests for the internationalization language switcher
 */

import type { Meta, StoryObj } from '@storybook/react';

import { NextIntlClientProvider } from 'next-intl';

import { LanguageSwitcher } from './LanguageSwitcher';

// Mock messages for Storybook
const messages = {
  navigation: {
    home: 'Home',
    characters: 'Characters',
    episodes: 'Episodes',
    locations: 'Locations',
  },
};

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Language switcher component with country flags for English (UK), German, and French locales.',
      },
    },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider locale='en' messages={messages}>
        <div className='p-4'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (English)',
};

export const German: Story = {
  name: 'German Locale',
  decorators: [
    Story => (
      <NextIntlClientProvider locale='de' messages={messages}>
        <div className='p-4'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export const French: Story = {
  name: 'French Locale',
  decorators: [
    Story => (
      <NextIntlClientProvider locale='fr' messages={messages}>
        <div className='p-4'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export const AllLanguages: Story = {
  name: 'All Language Options',
  parameters: {
    docs: {
      description: {
        story:
          'Shows all available language options with their respective country flags: UK 🇬🇧, Germany 🇩🇪, and France 🇫🇷.',
      },
    },
  },
  render: () => (
    <div className='flex gap-4 items-center'>
      <div className='text-center'>
        <p className='text-sm mb-2'>English</p>
        <NextIntlClientProvider locale='en' messages={messages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </div>
      <div className='text-center'>
        <p className='text-sm mb-2'>Deutsch</p>
        <NextIntlClientProvider locale='de' messages={messages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </div>
      <div className='text-center'>
        <p className='text-sm mb-2'>Français</p>
        <NextIntlClientProvider locale='fr' messages={messages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </div>
    </div>
  ),
};
