/**
 * Storybook stories for CharacterDetailDrawer
 * Demonstrates the character detail drawer component
 */

import type { Meta, StoryObj } from '@storybook/react';

import { NextIntlClientProvider } from 'next-intl';

import { CharacterDetailDrawer } from './CharacterDetailDrawer';
import { Character } from './CharacterTable';

const meta: Meta<typeof CharacterDetailDrawer> = {
  component: CharacterDetailDrawer,
  title: 'Rick and Morty/CharacterDetailDrawer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A drawer component that displays detailed character information from the Rick and Morty universe.',
      },
    },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider
        locale='en'
        messages={{
          characters: {
            loading: 'Loading...',
            search: 'Search characters...',
            status: 'Status',
            species: 'Species',
            gender: 'Gender',
          },
        }}
      >
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock character data
const mockCharacter: Character = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: '',
  },
  location: {
    name: 'Citadel of Ricks',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['1', '2', '3', '4', '5'],
  url: '',
  created: '2017-11-04T18:48:46.250Z',
};

const mockDeadCharacter: Character = {
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
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
  episode: ['28'],
  url: '',
  created: '2017-11-04T20:03:34.737Z',
};

const mockAlienCharacter: Character = {
  id: '6',
  name: 'Abadango Cluster Princess',
  status: 'Alive',
  species: 'Alien',
  type: '',
  gender: 'Female',
  origin: {
    name: 'Abadango',
    url: '',
  },
  location: {
    name: 'Abadango',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
  episode: ['27'],
  url: '',
  created: '2017-11-04T19:50:28.250Z',
};

export const Open: Story = {
  args: {
    character: mockCharacter,
    isOpen: true,
    onClose: () => console.log('Drawer closed'),
  },
};

export const Closed: Story = {
  args: {
    character: mockCharacter,
    isOpen: false,
    onClose: () => console.log('Drawer closed'),
  },
};

export const DeadCharacter: Story = {
  args: {
    character: mockDeadCharacter,
    isOpen: true,
    onClose: () => console.log('Drawer closed'),
  },
};

export const AlienCharacter: Story = {
  args: {
    character: mockAlienCharacter,
    isOpen: true,
    onClose: () => console.log('Drawer closed'),
  },
};

export const NoCharacter: Story = {
  args: {
    character: null,
    isOpen: true,
    onClose: () => console.log('Drawer closed'),
  },
};
