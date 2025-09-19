/**
 * CharacterListContainer - Smart Component (Container Pattern)
 * Handles Apollo Client data fetching and passes data to dumb CharacterList component
 */

'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';

import { gql } from '../src/__generated__';

import { CharacterList, type Character } from './CharacterList';

const GET_CHARACTERS = gql(`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`);

export function CharacterListContainer() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  // Transform GraphQL data to match our component interface
  const characters: Character[] =
    data?.characters?.results?.slice(0, 12)?.map(character => ({
      id: character?.id || '',
      name: character?.name || '',
      image: character?.image || '',
      status: (character?.status as 'Alive' | 'Dead' | 'unknown') || 'unknown',
      species: character?.species || '',
    })) || [];

  return (
    <CharacterList
      characters={characters}
      error={error?.message}
      loading={loading}
    />
  );
}

export default CharacterListContainer;
