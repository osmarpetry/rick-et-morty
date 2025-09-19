// Apollo Client configuration following official documentation
// https://www.apollographql.com/docs/react/get-started

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create HTTP link for GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
