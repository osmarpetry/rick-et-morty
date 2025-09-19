/**
 * MSW Handlers for Rick and Morty GraphQL API
 * Provides mock responses for development and testing
 */

import { graphql, HttpResponse } from 'msw';

// Mock character data
const mockCharacters = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      id: '1',
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
    },
    location: {
      id: '3',
      name: 'Citadel of Ricks',
      type: 'Space station',
      dimension: 'unknown',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      {
        id: '1',
        name: 'Pilot',
        episode: 'S01E01',
        air_date: 'December 2, 2013',
      },
    ],
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: '2',
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      id: '1',
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
    },
    location: {
      id: '3',
      name: 'Citadel of Ricks',
      type: 'Space station',
      dimension: 'unknown',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [
      {
        id: '1',
        name: 'Pilot',
        episode: 'S01E01',
        air_date: 'December 2, 2013',
      },
    ],
    created: '2017-11-04T18:50:21.651Z',
  },
];

// GraphQL handlers
export const handlers = [
  // Handle GetCharacters query
  graphql.query('GetCharacters', ({ variables }) => {
    return HttpResponse.json({
      data: {
        characters: {
          info: {
            count: 826,
            pages: 42,
            next: 2,
            prev: null,
          },
          results: mockCharacters,
        },
      },
    });
  }),

  // Handle GetCharacter query
  graphql.query('GetCharacter', ({ variables }) => {
    const { id } = variables as { id: string };
    const character = mockCharacters.find(char => char.id === id);

    if (!character) {
      return HttpResponse.json({
        errors: [
          {
            message: 'Character not found',
            locations: [{ line: 2, column: 3 }],
            path: ['character'],
          },
        ],
      });
    }

    return HttpResponse.json({
      data: {
        character,
      },
    });
  }),

  // Handle SearchCharacters query
  graphql.query('SearchCharacters', ({ variables }) => {
    const { name } = variables as { name: string };
    const filteredCharacters = mockCharacters.filter(char =>
      char.name.toLowerCase().includes(name.toLowerCase())
    );

    return HttpResponse.json({
      data: {
        characters: {
          info: {
            count: filteredCharacters.length,
            pages: 1,
          },
          results: filteredCharacters,
        },
      },
    });
  }),
];

export default handlers;
