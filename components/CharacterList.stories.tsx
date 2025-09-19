/**
 * CharacterList Storybook Stories
 * Visual tests for the Rick and Morty character list component (dumb component)
 */

import type { Meta, StoryObj } from '@storybook/react';

import { NextIntlClientProvider } from 'next-intl';

import { CharacterList, type Character } from './CharacterList';

// Mock messages for Storybook
const messages = {
  characters: {
    title: 'Rick and Morty Characters',
    loading: 'Loading characters...',
    error: 'Failed to load characters',
    status: 'Status',
    species: 'Species',
    gender: 'Gender',
    origin: 'Origin',
    location: 'Location',
    episodes: 'Episodes',
  },
};

// Mock character data
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    status: 'Alive',
    species: 'Human',
  },
  {
    id: '3',
    name: 'Summer Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    status: 'Alive',
    species: 'Human',
  },
  {
    id: '4',
    name: 'Beth Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    status: 'Alive',
    species: 'Human',
  },
  {
    id: '5',
    name: 'Jerry Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    status: 'Alive',
    species: 'Human',
  },
  {
    id: '6',
    name: 'Abadango Cluster Princess',
    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    status: 'Alive',
    species: 'Alien',
  },
  {
    id: '7',
    name: 'Abradolf Lincler',
    image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    status: 'unknown',
    species: 'Human',
  },
  {
    id: '8',
    name: 'Adjudicator Rick',
    image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    status: 'Dead',
    species: 'Human',
  },
];

const meta: Meta<typeof CharacterList> = {
  title: 'Components/CharacterList',
  component: CharacterList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Rick and Morty character list component with themed cards, status indicators, and responsive grid layout. This is a dumb component that receives data via props.',
      },
    },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider locale='en' messages={messages}>
        <div className='p-4 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    characters: {
      description: 'Array of character objects to display',
      control: { type: 'object' },
    },
    loading: {
      description: 'Loading state indicator',
      control: { type: 'boolean' },
    },
    error: {
      description: 'Error message to display',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default State',
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the character list with Rick and Morty themed cards and status indicators.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    characters: [],
    loading: true,
    error: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the loading spinner with Rick and Morty portal green theming.',
      },
    },
  },
};

export const Error: Story = {
  name: 'Error State',
  args: {
    characters: [],
    loading: false,
    error: 'Failed to fetch characters from the multiverse!',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the error state with themed error card and portal pink styling.',
      },
    },
  },
};

export const Empty: Story = {
  name: 'Empty State',
  args: {
    characters: [],
    loading: false,
    error: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the empty state when no characters are found.',
      },
    },
  },
};

export const SingleCharacter: Story = {
  name: 'Single Character',
  args: {
    characters: [mockCharacters[0]],
    loading: false,
    error: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a single character card for testing individual card styling.',
      },
    },
  },
};

export const DifferentStatuses: Story = {
  name: 'Different Status Types',
  args: {
    characters: [
      mockCharacters[0], // Alive
      mockCharacters[6], // Unknown
      mockCharacters[7], // Dead
    ],
    loading: false,
    error: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows characters with different status types to demonstrate color theming.',
      },
    },
  },
};

export const DarkTheme: Story = {
  name: 'Dark Theme',
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
  },
  parameters: {
    backgrounds: { default: 'rick-morty-dark' },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider locale='en' messages={messages}>
        <div className='p-4 min-h-screen bg-background dark'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export const GermanLocale: Story = {
  name: 'German Locale',
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='de'
        messages={{
          navigation: {
            title: 'Rick & Morty',
            home: 'Startseite',
            characters: 'Charaktere',
            episodes: 'Episoden',
            locations: 'Orte',
          },
          characters: {
            title: 'Rick und Morty Charaktere',
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
        <div className='p-4 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export const FrenchLocale: Story = {
  name: 'French Locale',
  args: {
    characters: mockCharacters,
    loading: false,
    error: undefined,
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='fr'
        messages={{
          navigation: {
            title: 'Rick & Morty',
            home: 'Accueil',
            characters: 'Personnages',
            episodes: 'Épisodes',
            locations: 'Lieux',
          },
          characters: {
            title: 'Personnages de Rick et Morty',
            loading: 'Chargement des personnages...',
            error: 'Échec du chargement des personnages',
            status: 'Statut',
            species: 'Espèce',
            gender: 'Genre',
            origin: 'Origine',
            location: 'Lieu',
            episodes: 'Épisodes',
          },
        }}
      >
        <div className='p-4 min-h-screen bg-background'>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};
