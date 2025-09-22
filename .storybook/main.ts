/**
 * Storybook Main Configuration
 * Enhanced configuration for Rick and Morty project with visual regression testing
 */

import type { StorybookConfig } from '@storybook/nextjs';

import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  webpackFinal: async config => {
    // Add path aliases to match Next.js configuration
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../'),
        '@/components': path.resolve(__dirname, '../components'),
        '@/types': path.resolve(__dirname, '../types'),
        '@/hooks': path.resolve(__dirname, '../hooks'),
        '@/lib': path.resolve(__dirname, '../lib'),
        '@/messages': path.resolve(__dirname, '../messages'),
      };
    }

    return config;
  },

  features: {
    experimentalRSC: true,
  },

  staticDirs: ['../public'],

  // Environment variables for Storybook
  env: config => ({
    ...config,
    STORYBOOK: 'true',
  }),
};

export default config;
