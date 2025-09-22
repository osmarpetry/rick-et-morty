import path from 'path';

import { defineConfig } from 'vitest/config';

// Basic Vitest configuration
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/e2e/**', '**/node_modules/**', '**/dist/**'],
  },
});
