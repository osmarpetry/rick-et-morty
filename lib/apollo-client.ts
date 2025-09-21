/**
 * Apollo Client configuration with cache persistence
 * Following Apollo documentation: https://www.apollographql.com/docs/react/caching/advanced-topics#persisting-the-cache
 */

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

// Create HTTP link for GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

// Create cache instance
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Configure pagination for characters query
        characters: {
          keyArgs: ['filter'], // Keep different filters separate
          merge(existing, incoming, { args }) {
            // Handle pagination by merging results
            if (!existing) {
              return incoming;
            }

            // If it's a new page, merge the results
            if (args?.page && args.page > 1) {
              return {
                ...incoming,
                results: [
                  ...(existing.results || []),
                  ...(incoming.results || []),
                ],
              };
            }

            // Otherwise, replace with new results (new search/filter)
            return incoming;
          },
        },
      },
    },
    Character: {
      // Use id as the key field for characters
      keyFields: ['id'],
    },
  },
});

// Initialize cache persistence
let persistor: Promise<void> | null = null;

if (typeof window !== 'undefined') {
  // Only run on client side
  persistor = persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    maxSize: 1048576, // 1MB
    debug: process.env.NODE_ENV === 'development',
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.error('Error persisting cache:', error);
  });
}

// Create Apollo Client instance
const client = new ApolloClient({
  link: from([httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Export both client and persistor for potential use in app
export { persistor };
export default client;
