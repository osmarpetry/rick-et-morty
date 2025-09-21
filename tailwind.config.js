import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        // Official Rick and Morty title screen colors for utility classes
        'portal-green': '#08C952',
        'rick-yellow': '#FCE46D',
        'morty-yellow': '#EDCF6B',
        'rick-red': '#A1140A',
        'space-purple': '#160440',
        // Legacy aliases for backward compatibility
        'rick-blue': '#08C952', // Updated to portal green
        'portal-pink': '#A1140A', // Updated to rick red
        'earth-brown': '#160440', // Updated to space purple
        'lab-peach': '#FCE46D', // Updated to rick yellow
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        dark: {
          extend: 'dark',
          colors: {
            background: '#0B0D0F',
            content1: '#121417',
            content2: '#171A1E',
            content3: '#1F2329',
            primary: {
              50: '#14532d',
              100: '#166534',
              200: '#15803d',
              300: '#16a34a',
              400: '#22c55e',
              500: '#08C952',
              600: '#4ade80',
              700: '#86efac',
              800: '#bbf7d0',
              900: '#dcfce7',
              DEFAULT: '#08C952',
              foreground: '#000000',
            },
            secondary: {
              50: '#713f12',
              100: '#854d0e',
              200: '#a16207',
              300: '#ca8a04',
              400: '#eab308',
              500: '#FCE46D',
              600: '#fde047',
              700: '#fef08a',
              800: '#fef9c3',
              900: '#fefce8',
              DEFAULT: '#FCE46D',
              foreground: '#160440',
            },
            danger: {
              50: '#7f1d1d',
              100: '#991b1b',
              200: '#b91c1c',
              300: '#dc2626',
              400: '#ef4444',
              500: '#f87171',
              600: '#fca5a5',
              700: '#fecaca',
              800: '#fee2e2',
              900: '#fef2f2',
              DEFAULT: '#A1140A',
              foreground: '#ffffff',
            },
          },
          layout: {
            radius: {
              small: '6px',
              medium: '8px',
              large: '12px',
            },
            dividerWeight: '1px',
          },
        },
        light: {
          extend: 'light',
          colors: {
            primary: {
              50: '#f0fdf4',
              100: '#dcfce7',
              200: '#bbf7d0',
              300: '#86efac',
              400: '#4ade80',
              500: '#08C952',
              600: '#16a34a',
              700: '#15803d',
              800: '#166534',
              900: '#14532d',
              DEFAULT: '#08C952',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#fefce8',
              100: '#fef9c3',
              200: '#fef08a',
              300: '#fde047',
              400: '#facc15',
              500: '#FCE46D',
              600: '#ca8a04',
              700: '#a16207',
              800: '#854d0e',
              900: '#713f12',
              DEFAULT: '#FCE46D',
              foreground: '#160440',
            },
            danger: {
              50: '#fef2f2',
              100: '#fee2e2',
              200: '#fecaca',
              300: '#fca5a5',
              400: '#f87171',
              500: '#ef4444',
              600: '#dc2626',
              700: '#b91c1c',
              800: '#991b1b',
              900: '#7f1d1d',
              DEFAULT: '#A1140A',
              foreground: '#ffffff',
            },
          },
          layout: {
            radius: {
              small: '6px',
              medium: '8px',
              large: '12px',
            },
            dividerWeight: '1px',
          },
        },
      },
    }),
  ],
};

export default config;
