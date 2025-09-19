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
        'rick-morty-light': rickAndMortyLight,
        'rick-morty-dark': rickAndMortyDark,
        light: rickAndMortyLight,
        dark: rickAndMortyDark,
      },
    }),
  ],
};

module.exports = config;
