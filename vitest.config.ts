import { defineConfig } from 'vitest/config';

// Basic Vitest configuration
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
