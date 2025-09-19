/**
 * Rick and Morty Theme Configuration for Hero UI
 * Based on color palette from https://www.color-hex.com/color-palette/9134
 * Following Hero UI theme structure: https://www.heroui.com/docs/customization/theme
 *
 * Colors:
 * - #44281d (68,40,29) - Dark Brown (Earth tones)
 * - #e4a788 (228,167,136) - Light Brown/Peach (Lab coat)
 * - #f0e14a (240,225,74) - Yellow (Morty's shirt)
 * - #97ce4c (151,206,76) - Green (Portal/Science)
 * - #e89ac7 (232,154,199) - Pink (Portal effects)
 */

const rickAndMortyLight = {
  extend: 'light',
  colors: {
    // Primary - Portal Green (Science/Adventure theme)
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#97ce4c',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      DEFAULT: '#97ce4c',
      foreground: '#ffffff',
    },
    // Secondary - Morty Yellow (Optimistic/Bright)
    secondary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#f0e14a',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      DEFAULT: '#f0e14a',
      foreground: '#44281d',
    },
    // Success - Portal Green
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#97ce4c',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      DEFAULT: '#97ce4c',
      foreground: '#ffffff',
    },
    // Warning - Rick's Hair Yellow
    warning: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#f0e14a',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      DEFAULT: '#f0e14a',
      foreground: '#44281d',
    },
    // Danger - Portal Pink
    danger: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#e89ac7',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      DEFAULT: '#e89ac7',
      foreground: '#ffffff',
    },
    // Background & Content
    background: '#ffffff',
    foreground: '#44281d',
    content1: '#ffffff',
    content2: '#f8fafc',
    content3: '#f1f5f9',
    content4: '#e2e8f0',
    // Default - Earth Brown/Peach
    default: {
      50: '#faf9f7',
      100: '#f5f2ed',
      200: '#ebe4d9',
      300: '#ddd0c0',
      400: '#cbb5a0',
      500: '#e4a788',
      600: '#a0845c',
      700: '#7a6649',
      800: '#5c4d3a',
      900: '#44281d',
      DEFAULT: '#e4a788',
      foreground: '#44281d',
    },
    // Focus ring
    focus: '#97ce4c',
    // Divider
    divider: 'rgba(68, 40, 29, 0.15)',
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
};

const rickAndMortyDark = {
  extend: 'dark',
  colors: {
    // Primary - Brighter Portal Green for dark mode
    primary: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#22c55e',
      500: '#97ce4c',
      600: '#4ade80',
      700: '#86efac',
      800: '#bbf7d0',
      900: '#dcfce7',
      DEFAULT: '#97ce4c',
      foreground: '#000000',
    },
    // Secondary - Bright Yellow for dark mode
    secondary: {
      50: '#713f12',
      100: '#854d0e',
      200: '#a16207',
      300: '#ca8a04',
      400: '#eab308',
      500: '#f0e14a',
      600: '#fde047',
      700: '#fef08a',
      800: '#fef9c3',
      900: '#fefce8',
      DEFAULT: '#f0e14a',
      foreground: '#000000',
    },
    // Success - Portal Green
    success: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#22c55e',
      500: '#97ce4c',
      600: '#4ade80',
      700: '#86efac',
      800: '#bbf7d0',
      900: '#dcfce7',
      DEFAULT: '#97ce4c',
      foreground: '#000000',
    },
    // Warning - Bright Yellow
    warning: {
      50: '#713f12',
      100: '#854d0e',
      200: '#a16207',
      300: '#ca8a04',
      400: '#eab308',
      500: '#f0e14a',
      600: '#fde047',
      700: '#fef08a',
      800: '#fef9c3',
      900: '#fefce8',
      DEFAULT: '#f0e14a',
      foreground: '#000000',
    },
    // Danger - Bright Portal Pink
    danger: {
      50: '#831843',
      100: '#9d174d',
      200: '#be185d',
      300: '#db2777',
      400: '#ec4899',
      500: '#e89ac7',
      600: '#f472b6',
      700: '#f9a8d4',
      800: '#fbcfe8',
      900: '#fdf2f8',
      DEFAULT: '#e89ac7',
      foreground: '#000000',
    },
    // Dark mode backgrounds
    background: '#0a0a0a',
    foreground: '#ecedee',
    content1: '#18181b',
    content2: '#27272a',
    content3: '#3f3f46',
    content4: '#52525b',
    // Default - Muted earth tones for dark mode
    default: {
      50: '#44281d',
      100: '#5c4d3a',
      200: '#7a6649',
      300: '#a0845c',
      400: '#c19a73',
      500: '#e4a788',
      600: '#eab795',
      700: '#f0c7a2',
      800: '#f6d7af',
      900: '#fce7bc',
      DEFAULT: '#3f3f46',
      foreground: '#ecedee',
    },
    // Focus ring
    focus: '#97ce4c',
    // Divider
    divider: 'rgba(255, 255, 255, 0.15)',
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
};

// Export both themes for use in Tailwind config
export { rickAndMortyLight, rickAndMortyDark };
