/**
 * ThemeToggle Storybook Stories
 * Visual tests for the Rick and Morty themed toggle component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';

import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/Theme/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Rick and Morty themed toggle component that switches between light and dark themes with portal-inspired styling.',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider attribute='class' defaultTheme='light'>
        <div className='p-4'>
          <Story />
        </div>
      </ThemeProvider>
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
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <div className='p-4 dark'>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const Interactive: Story = {
  name: 'Interactive Demo',
  parameters: {
    docs: {
      description: {
        story:
          'Click the toggle to see the smooth transition between light and dark themes with Rick and Morty portal colors.',
      },
    },
  },
};
