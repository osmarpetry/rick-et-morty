// CharacterList component following Apollo documentation
// https://www.apollographql.com/docs/react/data/queries

'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';

import { gql } from '../src/__generated__';

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

function CharacterList() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {data?.characters?.results?.map(character => (
        <div key={character?.id} className='border rounded-lg p-4 shadow-md'>
          <img
            alt={character?.name || 'Character'}
            className='w-full h-48 object-cover rounded-md mb-2'
            src={character?.image || ''}
          />
          <h3 className='text-lg font-semibold'>{character?.name}</h3>
          <p className='text-sm text-gray-600'>Status: {character?.status}</p>
          <p className='text-sm text-gray-600'>Species: {character?.species}</p>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
