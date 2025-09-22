/**
 * Apollo Client configuration with cache persistence
 * Following Apollo documentation: https://www.apollographql.com/docs/react/caching/advanced-topics#persisting-the-cache
 */

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

// Create HTTP link for GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

// Create cache instance
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Configure pagination for characters query - HeroUI async pagination pattern
        characters: {
          keyArgs: ['filter', 'page'], // Keep different filters AND pages separate
          // Each page is cached separately for optimal performance
          // This prevents unnecessary refetches when navigating between cached pages
        },
      },
    },
    Characters: {
      fields: {
        // Separate caching for pagination info vs results
        info: {
          // Pagination info (count, pages, next, prev) is cached per filter only
          keyArgs: ['filter'], // Cache info per filter, not per page
        },
        results: {
          // Results are cached per page and filter combination
          keyArgs: ['filter', 'page'], // Cache results per page and filter
        },
      },
    },
    Character: {
      // Use id as the key field for characters
      keyFields: ['id'],
    },
  },
});

// Cache is configured for optimal HeroUI async pagination performance
// Persistence can be added later if needed

// Create Apollo Client instance
const client = new ApolloClient({
  link: from([httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first', // Prefer cache to reduce network requests
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'cache-first', // Prefer cache to reduce network requests
      errorPolicy: 'all',
    },
  },
});

// Export Apollo Client instance
export default client;
