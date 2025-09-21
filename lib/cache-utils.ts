/**
 * Cache management utilities for Apollo Client
 * Provides helper functions for cache operations and debugging
 */

import client from './apollo-client';

/**
 * Clear all cached data
 * Useful for debugging or when user logs out
 */
export const clearCache = async (): Promise<void> => {
  try {
    await client.clearStore();

    // Also clear localStorage cache if available
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('apollo-cache-persist');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error clearing cache:', error);
  }
};

/**
 * Get cache size information
 * Useful for monitoring cache usage
 */
export const getCacheInfo = (): { size: number; keys: number } | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const cacheData = window.localStorage.getItem('apollo-cache-persist');

    return {
      size: cacheData ? new Blob([cacheData]).size : 0,
      keys: Object.keys(window.localStorage).filter(key =>
        key.startsWith('apollo-cache-persist')
      ).length,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting cache info:', error);

    return null;
  }
};

/**
 * Reset cache to initial state
 * Useful for development and testing
 */
export const resetCache = async (): Promise<void> => {
  try {
    await client.resetStore();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error resetting cache:', error);
  }
};
