import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@heroui/drawer';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Image } from '@heroui/image';
import { Icon } from '@iconify/react';

import { Character, CharacterGender, CharacterStatus } from '@/types';

interface CharacterDrawerProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

function statusColor(
  status: CharacterStatus
): 'success' | 'danger' | 'default' {
  if (status === 'Alive') return 'success';
  if (status === 'Dead') return 'danger';

  return 'default';
}

function genderIcon(gender: CharacterGender) {
  switch (gender) {
    case 'Male':
      return 'lucide:mars';
    case 'Female':
      return 'lucide:venus';
    case 'Genderless':
      return 'lucide:ban';
    default:
      return 'lucide:user';
  }
}

export default function CharacterDrawer({
  character,
  isOpen,
  onClose,
}: CharacterDrawerProps) {
  const episodesCount = character?.episode ? character.episode.length : 0;

  return (
    <Drawer
      classNames={{
        // Custom Slots styled like heroui.com Drawer - Custom Styles
        wrapper: 'shadow-large',
        backdrop: 'bg-overlay/50 backdrop-blur-sm',
        base: 'rounded-l-large bg-content1',
        header: 'p-5 bg-content1 text-foreground border-b border-divider',
        body: 'p-5 sm:p-6 bg-content1 text-foreground',
        footer: 'border-t border-divider p-4 bg-content1',
        closeButton:
          'top-3 right-3 rounded-full bg-content2 text-foreground hover:bg-content3',
      }}
      hideCloseButton={false} // Show built-in close button (Custom Styles)
      isOpen={isOpen}
      placement='bottom'
      size='3xl'
      onOpenChange={onClose}
    >
      <DrawerContent>
        {onClose => (
          <>
            <DrawerHeader className='flex items-center justify-between gap-3 sticky top-0 z-10 bg-content1 backdrop-blur-sm border-b border-divider text-foreground shadow-small'>
              <div className='flex items-center gap-3'>
                <Icon
                  className='text-primary-500'
                  height={20}
                  icon='lucide:user-round'
                  width={20}
                />
                <span className='text-large font-semibold'>
                  {character?.name ?? 'Character'}
                </span>
              </div>
            </DrawerHeader>
            <DrawerBody>
              {character && (
                <div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-start'>
                  {/* Image on the left for md+; on mobile it stacks on top */}
                  <div className='md:col-span-4'>
                    <div className='relative mx-auto md:mx-0 w-64 sm:w-72 md:w-full max-w-sm aspect-square overflow-hidden rounded-large bg-content2 border border-divider shadow-small'>
                      <Image
                        removeWrapper
                        alt={character.name}
                        className='w-full h-full object-cover'
                        src={character.image}
                      />
                    </div>
                  </div>
                  <div className='md:col-span-8 w-full max-w-3xl md:max-w-none flex flex-col gap-4 justify-center'>
                    {/* Details stack */}
                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-2'>
                      <Chip
                        className='capitalize'
                        color={statusColor(character.status)}
                        size='md'
                        variant='flat'
                      >
                        {character.status}
                      </Chip>
                      <Chip className='capitalize' size='md' variant='flat'>
                        {character.species}
                      </Chip>
                      <Chip className='capitalize' size='md' variant='flat'>
                        <div className='flex items-center gap-1'>
                          <Icon
                            height={16}
                            icon={genderIcon(character.gender)}
                            width={16}
                          />
                          <span>{character.gender}</span>
                        </div>
                      </Chip>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='bg-content2 p-4 rounded-large border border-divider shadow-small hover:shadow-medium transition-all duration-200'>
                        <p className='text-tiny text-foreground-500'>Origin</p>
                        <p className='text-small font-medium text-foreground'>
                          {character.origin?.name ?? 'Unknown'}
                        </p>
                      </div>
                      <div className='bg-content2 p-4 rounded-large border border-divider shadow-small hover:shadow-medium transition-all duration-200'>
                        <p className='text-tiny text-foreground-500'>
                          Last Known Location
                        </p>
                        <p className='text-small font-medium text-foreground'>
                          {character.location?.name ?? 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className='bg-content2 p-4 rounded-large border border-divider shadow-small hover:shadow-medium transition-all duration-200'>
                      <p className='text-small font-medium text-foreground mb-2'>
                        Episode Appearances
                      </p>
                      <p className='text-tiny text-foreground-500'>
                        This character appears in {episodesCount} episode
                        {episodesCount === 1 ? '' : 's'}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </DrawerBody>
            <DrawerFooter>
              <Button color='primary' variant='ghost' onPress={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
