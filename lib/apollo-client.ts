/**
 * Apollo Client configuration with cache persistence
 * Following Apollo documentation: https://www.apollographql.com/docs/react/caching/advanced-topics#persisting-the-cache
 */

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: ['filter', 'page'],
        },
      },
    },
    Characters: {
      fields: {
        info: {
          keyArgs: ['filter'],
        },
        results: {
          keyArgs: ['filter', 'page'],
        },
      },
    },
    Character: {
      keyFields: ['id'],
    },
  },
});

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
