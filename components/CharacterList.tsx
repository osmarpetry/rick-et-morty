/**
 * CharacterList - Dumb Component (Atomic Design)
 * Receives character data via props, no Apollo Client dependency
 */

'use client';

import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { useTranslations } from 'next-intl';

export interface Character {
  id: string;
  name: string;
  image: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
}

export interface CharacterListProps {
  characters?: Character[];
  loading?: boolean;
  error?: string;
}

/**
 * Status color mapping using Rick and Morty theme colors
 */
const statusColorMap = {
  Alive: 'success' as const, // Portal green
  Dead: 'danger' as const, // Portal pink
  unknown: 'warning' as const, // Morty yellow
};

export function CharacterList({
  characters = [],
  loading = false,
  error,
}: CharacterListProps) {
  const t = useTranslations('characters');

  if (loading) {
    return (
      <div className='flex justify-center items-center p-8'>
        <Spinner className='text-portal-green' label={t('loading')} size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <Card className='max-w-md mx-auto border-2 border-danger'>
        <CardHeader className='bg-danger/10'>
          <h3 className='text-lg font-semibold text-danger'>{t('error')}</h3>
        </CardHeader>
        <CardBody>
          <p className='text-danger-600'>{error}</p>
        </CardBody>
      </Card>
    );
  }

  if (characters.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-64 text-default-600'>
        <p className='text-lg font-semibold'>No characters found</p>
        <p className='text-sm'>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-portal-green via-morty-yellow to-portal-pink bg-clip-text text-transparent'>
          {t('title')}
        </h1>
        <p className='text-default-600 text-lg'>Wubba Lubba Dub Dub! 🚀</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
        {characters.map(character => (
          <Card
            key={character.id}
            isPressable
            className='
              group cursor-pointer transition-all duration-300
              hover:scale-105 hover:shadow-2xl
              border-2 border-transparent hover:border-primary
              bg-gradient-to-br from-content1 to-content2
            '
          >
            <CardHeader className='flex gap-3 pb-2'>
              <Avatar
                className='ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all'
                size='lg'
                src={character.image || ''}
              />
              <div className='flex flex-col flex-1'>
                <h3 className='text-lg font-bold text-foreground group-hover:text-primary transition-colors'>
                  {character.name}
                </h3>
                <p className='text-sm text-default-500'>{character.species}</p>
              </div>
            </CardHeader>

            <CardBody className='pt-0'>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm font-medium'>{t('status')}:</span>
                  <Chip
                    className='font-semibold'
                    color={statusColorMap[character.status] || 'default'}
                    size='sm'
                    variant='flat'
                  >
                    {character.status}
                  </Chip>
                </div>

                <div className='pt-2 border-t border-divider'>
                  <p className='text-xs text-default-500 text-center'>
                    🚀 Interdimensional Character 🚀
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
