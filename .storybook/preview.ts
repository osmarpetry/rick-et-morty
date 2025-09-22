/**
 * Storybook Preview Configuration
 * Global configuration for Rick and Morty themed stories
 */

import type { Preview } from '@storybook/react';
import '../styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Custom Rick and Morty theme backgrounds
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'rick-morty-light',
          value: '#f8fafc',
        },
        {
          name: 'rick-morty-dark',
          value: '#160440',
        },
        {
          name: 'portal-green',
          value: '#08C952',
        },
        {
          name: 'rick-yellow',
          value: '#FCE46D',
        },
        {
          name: 'rick-red',
          value: '#A1140A',
        },
      ],
    },

    // Viewport configurations for responsive testing
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
        wide: {
          name: 'Wide Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },

    // Accessibility addon configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },

    // Documentation configuration
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
      },
    },

    // Layout configuration
    layout: 'centered',

    // Options for the measure addon
    measure: {
      results: {
        precision: 2,
        unit: 'px',
      },
    },

    // Options for the outline addon
    outline: {
      color: '#08C952',
      width: '2px',
    },
  },

  // Global decorators
  decorators: [],

  // Global types for controls
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', right: '🇬🇧' },
          { value: 'de', title: 'Deutsch', right: '🇩🇪' },
          { value: 'fr', title: 'Français', right: '🇫🇷' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // Tags for organizing stories
  tags: ['autodocs'],
};

export default preview;
