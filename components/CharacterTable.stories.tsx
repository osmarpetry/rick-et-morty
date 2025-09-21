/**
 * CharacterTable Storybook Stories
 * Showcases the Hero UI Table component with Rick and Morty data
 */

import type { Meta, StoryObj } from '@storybook/react';

import { NextIntlClientProvider } from 'next-intl';

import CharacterTable, { Character } from './CharacterTable';

const meta: Meta<typeof CharacterTable> = {
  title: 'Components/CharacterTable',
  component: CharacterTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Advanced character table component built with Hero UI Table. Features search, pagination, column selection, and row selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner when true',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    currentPage: {
      control: 'number',
      description: 'Current page number',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock character data
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3',
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
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
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
    ],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
  {
    id: '3',
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/6',
      'https://rickandmortyapi.com/api/episode/7',
    ],
    url: 'https://rickandmortyapi.com/api/character/3',
    created: '2017-11-04T19:09:56.428Z',
  },
  {
    id: '4',
    name: 'Beth Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/6',
      'https://rickandmortyapi.com/api/episode/7',
    ],
    url: 'https://rickandmortyapi.com/api/character/4',
    created: '2017-11-04T19:22:43.665Z',
  },
  {
    id: '5',
    name: 'Jerry Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/6',
      'https://rickandmortyapi.com/api/episode/7',
    ],
    url: 'https://rickandmortyapi.com/api/character/5',
    created: '2017-11-04T19:26:56.301Z',
  },
  {
    id: '6',
    name: 'Abadango Cluster Princess',
    status: 'Alive',
    species: 'Alien',
    type: '',
    gender: 'Female',
    origin: {
      name: 'Abadango',
      url: 'https://rickandmortyapi.com/api/location/2',
    },
    location: {
      name: 'Abadango',
      url: 'https://rickandmortyapi.com/api/location/2',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/27'],
    url: 'https://rickandmortyapi.com/api/character/6',
    created: '2017-11-04T19:50:28.250Z',
  },
  {
    id: '7',
    name: 'Abradolf Lincler',
    status: 'unknown',
    species: 'Human',
    type: 'Genetic experiment',
    gender: 'Male',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    location: {
      name: 'Testicle Monster Dimension',
      url: 'https://rickandmortyapi.com/api/location/21',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/10',
      'https://rickandmortyapi.com/api/episode/11',
    ],
    url: 'https://rickandmortyapi.com/api/character/7',
    created: '2017-11-04T19:59:20.523Z',
  },
  {
    id: '8',
    name: 'Adjudicator Rick',
    status: 'Dead',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/28'],
    url: 'https://rickandmortyapi.com/api/character/8',
    created: '2017-11-04T20:03:34.737Z',
  },
];

// Default story with full functionality
export const Default: Story = {
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
    currentPage: 1,
    totalPages: 3,
    filterValue: '',
    statusFilter: [],
    genderFilter: [],
    speciesFilter: [],
    visibleColumns: ['character', 'status', 'species', 'gender'],
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='en'
        messages={{
          characters: {
            search: 'Search characters...',
            loading: 'Loading characters...',
            error: 'Failed to load characters',
            status: 'Status',
            species: 'Species',
            gender: 'Gender',
            origin: 'Origin',
            location: 'Location',
            episodes: 'Episodes',
          },
        }}
      >
        <div className='p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

// Loading state
export const Loading: Story = {
  args: {
    characters: [],
    loading: true,
    error: undefined,
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='en'
        messages={{
          characters: {
            loading: 'Loading characters...',
            error: 'Failed to load characters',
          },
        }}
      >
        <div className='p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

// Error state
export const Error: Story = {
  args: {
    characters: [],
    loading: false,
    error: 'Failed to fetch characters from the Rick and Morty API',
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='en'
        messages={{
          characters: {
            loading: 'Loading characters...',
            error: 'Failed to load characters',
          },
        }}
      >
        <div className='p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

// Empty state
export const Empty: Story = {
  args: {
    characters: [],
    loading: false,
    error: undefined,
    currentPage: 1,
    totalPages: 1,
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='en'
        messages={{
          characters: {
            search: 'Search characters...',
            loading: 'Loading characters...',
            error: 'Failed to load characters',
          },
        }}
      >
        <div className='p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
    currentPage: 1,
    totalPages: 3,
  },
  parameters: {
    backgrounds: { default: 'rick-morty-dark' },
    theme: 'dark',
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='en'
        messages={{
          characters: {
            search: 'Search characters...',
            loading: 'Loading characters...',
            error: 'Failed to load characters',
            status: 'Status',
            species: 'Species',
            gender: 'Gender',
            origin: 'Origin',
            location: 'Location',
            episodes: 'Episodes',
          },
        }}
      >
        <div className='dark p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

// German locale
export const GermanLocale: Story = {
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
    currentPage: 1,
    totalPages: 3,
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='de'
        messages={{
          characters: {
            search: 'Charaktere suchen...',
            loading: 'Charaktere werden geladen...',
            error: 'Fehler beim Laden der Charaktere',
            status: 'Status',
            species: 'Spezies',
            gender: 'Geschlecht',
            origin: 'Herkunft',
            location: 'Standort',
            episodes: 'Episoden',
          },
        }}
      >
        <div className='p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

// Multiple filters selected
export const WithMultipleFilters: Story = {
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
    currentPage: 1,
    totalPages: 3,
    filterValue: 'rick',
    statusFilter: ['Alive', 'Dead'],
    genderFilter: ['Male', 'Female'],
    speciesFilter: ['Human'],
    visibleColumns: ['character', 'status', 'species', 'gender', 'origin'],
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='en'
        messages={{
          characters: {
            search: 'Search characters...',
            loading: 'Loading characters...',
            error: 'Failed to load characters',
            status: 'Status',
            species: 'Species',
            gender: 'Gender',
            origin: 'Origin',
            location: 'Location',
            episodes: 'Episodes',
          },
        }}
      >
        <div className='p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

// French locale
export const FrenchLocale: Story = {
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
    currentPage: 1,
    totalPages: 3,
    filterValue: '',
    statusFilter: [],
    genderFilter: [],
    speciesFilter: [],
    visibleColumns: ['character', 'status', 'species', 'gender'],
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='fr'
        messages={{
          characters: {
            search: 'Rechercher des personnages...',
            loading: 'Chargement des personnages...',
            error: 'Échec du chargement des personnages',
            status: 'Statut',
            species: 'Espèce',
            gender: 'Genre',
            origin: 'Origine',
            location: 'Localisation',
            episodes: 'Épisodes',
          },
        }}
      >
        <div className='p-6 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};
