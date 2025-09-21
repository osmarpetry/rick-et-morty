/**
 * Character Detail Drawer Component
 * Displays detailed character information in a side drawer
 * Following Hero UI Drawer documentation: https://www.heroui.com/docs/components/drawer
 */

'use client';

import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@heroui/drawer';
import { Button } from '@heroui/button';
import { Chip, ChipProps } from '@heroui/chip';
import { Card, CardBody } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Character } from './CharacterTable';

export interface CharacterDetailDrawerProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColorMap: Record<string, ChipProps['color']> = {
  Alive: 'success',
  Dead: 'danger',
  unknown: 'warning',
};

const genderColorMap: Record<string, ChipProps['color']> = {
  Male: 'primary',
  Female: 'secondary',
  Genderless: 'default',
  unknown: 'warning',
};

export function CharacterDetailDrawer({
  character,
  isOpen,
  onClose,
}: CharacterDetailDrawerProps) {
  if (!character) {
    return null;
  }

  return (
    <Drawer
      backdrop='blur'
      isOpen={isOpen}
      placement='right'
      size='md'
      onOpenChange={open => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DrawerContent>
        {onClose => (
          <>
            <DrawerHeader className='flex flex-col gap-1 pb-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>{character.name}</h2>
                <Button isIconOnly size='sm' variant='light' onPress={onClose}>
                  <XMarkIcon className='h-5 w-5' />
                </Button>
              </div>
              <div className='flex gap-2'>
                <Chip
                  color={statusColorMap[character.status]}
                  size='sm'
                  variant='flat'
                >
                  {character.status}
                </Chip>
                <Chip
                  color={genderColorMap[character.gender]}
                  size='sm'
                  variant='flat'
                >
                  {character.gender}
                </Chip>
              </div>
            </DrawerHeader>

            <DrawerBody>
              <div className='space-y-6'>
                {/* Character Image */}
                <div className='flex justify-center'>
                  <Avatar
                    className='h-32 w-32'
                    name={character.name}
                    src={character.image}
                  />
                </div>

                {/* Basic Information */}
                <Card>
                  <CardBody className='space-y-3'>
                    <h3 className='text-lg font-semibold'>Basic Information</h3>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='font-medium'>Species:</span>
                        <span>{character.species}</span>
                      </div>
                      {character.type && (
                        <div className='flex justify-between'>
                          <span className='font-medium'>Type:</span>
                          <span>{character.type}</span>
                        </div>
                      )}
                      <div className='flex justify-between'>
                        <span className='font-medium'>Status:</span>
                        <Chip
                          color={statusColorMap[character.status]}
                          size='sm'
                          variant='flat'
                        >
                          {character.status}
                        </Chip>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium'>Gender:</span>
                        <Chip
                          color={genderColorMap[character.gender]}
                          size='sm'
                          variant='flat'
                        >
                          {character.gender}
                        </Chip>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Location Information */}
                <Card>
                  <CardBody className='space-y-3'>
                    <h3 className='text-lg font-semibold'>
                      Location Information
                    </h3>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='font-medium'>Origin:</span>
                        <span className='text-right'>
                          {character.origin.name}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium'>Last Location:</span>
                        <span className='text-right'>
                          {character.location.name}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Episode Information */}
                <Card>
                  <CardBody className='space-y-3'>
                    <h3 className='text-lg font-semibold'>
                      Episode Information
                    </h3>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='font-medium'>Total Episodes:</span>
                        <Chip color='primary' size='sm' variant='flat'>
                          {character.episode.length}
                        </Chip>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium'>First Appearance:</span>
                        <span>Episode {character.episode[0] || 'Unknown'}</span>
                      </div>
                      {character.episode.length > 1 && (
                        <div className='flex justify-between'>
                          <span className='font-medium'>
                            Latest Appearance:
                          </span>
                          <span>
                            Episode{' '}
                            {character.episode[character.episode.length - 1]}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>

                {/* Creation Date */}
                <Card>
                  <CardBody>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Created:</span>
                      <span>
                        {new Date(character.created).toLocaleDateString()}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </DrawerBody>

            <DrawerFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default CharacterDetailDrawer;
