/**
 * MSW Browser Setup
 * Configures Mock Service Worker for browser environment
 */

import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

// Setup worker with our handlers
export const worker = setupWorker(...handlers);

// Start worker in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}
