/**
 * Rick and Morty Character List Component
 * Features themed design and internationalization support
 */

'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { useTranslations } from 'next-intl';

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

/**
 * Status color mapping using Rick and Morty theme colors
 */
const statusColorMap = {
  Alive: 'success', // Portal green
  Dead: 'danger', // Portal pink
  unknown: 'warning', // Morty yellow
} as const;

export function CharacterList() {
  const t = useTranslations('characters');
  const { loading, error, data } = useQuery(GET_CHARACTERS);

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
          <p className='text-danger-600'>{error.message}</p>
        </CardBody>
      </Card>
    );
  }

  const characters = data?.characters?.results?.slice(0, 12) || [];

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
            key={character?.id}
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
                src={character?.image || ''}
              />
              <div className='flex flex-col flex-1'>
                <h3 className='text-lg font-bold text-foreground group-hover:text-primary transition-colors'>
                  {character?.name}
                </h3>
                <p className='text-sm text-default-500'>{character?.species}</p>
              </div>
            </CardHeader>

            <CardBody className='pt-0'>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm font-medium'>{t('status')}:</span>
                  <Chip
                    className='font-semibold'
                    color={
                      statusColorMap[
                        character?.status as keyof typeof statusColorMap
                      ] || 'default'
                    }
                    size='sm'
                    variant='flat'
                  >
                    {character?.status}
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
