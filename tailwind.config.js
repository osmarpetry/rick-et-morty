import { heroui } from '@heroui/theme';
import { rickAndMortyLight, rickAndMortyDark } from './config/theme';

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
        // Rick and Morty custom colors for additional utility classes
        'rick-blue': '#00b4d8',
        'morty-yellow': '#f0e14a',
        'portal-green': '#97ce4c',
        'portal-pink': '#e89ac7',
        'earth-brown': '#44281d',
        'lab-peach': '#e4a788',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        'rick-morty-light': rickAndMortyLight,
        'rick-morty-dark': rickAndMortyDark,
        light: rickAndMortyLight,
        dark: rickAndMortyDark,
      },
    }),
  ],
};

module.exports = config;
