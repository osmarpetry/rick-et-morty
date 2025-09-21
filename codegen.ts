import { CodegenConfig } from '@graphql-codegen/cli';

// GraphQL Code Generator configuration following Apollo documentation
// https://www.apollographql.com/docs/react/development-testing/graphql-codegen

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: [
    'src/**/*.tsx',
    'app/**/*.tsx',
    'components/**/*.tsx',
    'lib/**/*.ts',
  ],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
