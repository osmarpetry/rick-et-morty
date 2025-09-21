/**
 * Rick and Morty Character Table Component
 * Features: Hero UI Table, Search, Pagination, Row Selection, Detail Drawer
 * Following Hero UI Table documentation: https://www.heroui.com/docs/components/table
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';
import { Chip, ChipProps } from '@heroui/chip';
import { User } from '@heroui/user';
import { Pagination } from '@heroui/pagination';
import { Spinner } from '@heroui/spinner';
import { Select, SelectItem } from '@heroui/select';
import { useTranslations } from 'next-intl';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './theme/ThemeToggle';

// Character interface based on Rick and Morty API
export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterTableProps {
  characters: Character[];
  loading?: boolean;
  error?: string;
  totalPages?: number;
  currentPage?: number;
  filterValue?: string;
  statusFilter?: string[];
  genderFilter?: string[];
  speciesFilter?: string[];
  visibleColumns?: string[];
  selectedCharacter?: string;
  onPageChange?: (page: number) => void;
  onSearch?: (searchTerm: string) => void;
  onStatusFilter?: (status: string[]) => void;
  onGenderFilter?: (gender: string[]) => void;
  onSpeciesFilter?: (species: string[]) => void;
  onColumnsChange?: (columns: string[]) => void;
  onCharacterSelect?: (characterId: string) => void;
}

const statusColorMap: Record<string, ChipProps['color']> = {
  Alive: 'success',
  Dead: 'danger',
  unknown: 'warning',
};

const columns = [
  { name: 'CHARACTER', uid: 'character' },
  { name: 'STATUS', uid: 'status' },
  { name: 'SPECIES', uid: 'species' },
  { name: 'GENDER', uid: 'gender' },
  { name: 'ORIGIN', uid: 'origin' },
  { name: 'LOCATION', uid: 'location' },
  { name: 'EPISODES', uid: 'episodes' },
];

const INITIAL_VISIBLE_COLUMNS = ['character', 'status', 'species', 'gender'];

export function CharacterTable({
  characters = [],
  loading = false,
  error,
  totalPages = 1,
  currentPage = 1,
  filterValue = '',
  statusFilter = [],
  genderFilter = [],
  speciesFilter = [],
  visibleColumns = INITIAL_VISIBLE_COLUMNS,
  selectedCharacter = '',
  onPageChange,
  onSearch,
  onStatusFilter,
  onGenderFilter,
  onSpeciesFilter,
  onColumnsChange,
  onCharacterSelect,
}: CharacterTableProps) {
  const t = useTranslations('characters');

  // Handle search with debouncing
  const onSearchChange = useCallback(
    (value?: string) => {
      if (onSearch) {
        onSearch(value || '');
      }
    },
    [onSearch]
  );

  const onClear = useCallback(() => {
    if (onSearch) {
      onSearch('');
    }
  }, [onSearch]);

  // Filtered columns based on visibility selection
  const headerColumns = useMemo(() => {
    if (!Array.isArray(visibleColumns)) return columns;

    return columns.filter(column => visibleColumns.includes(column.uid));
  }, [visibleColumns]);

  // Characters are already filtered by GraphQL, just pass them through
  const filteredCharacters = useMemo(() => {
    return characters;
  }, [characters]);

  // Render cell content based on column
  const renderCell = useCallback(
    (character: Character, columnKey: React.Key): React.ReactNode => {
      const cellValue = character[columnKey as keyof Character];

      switch (columnKey) {
        case 'character':
          return (
            <User
              avatarProps={{ radius: 'lg', src: character.image }}
              description={character.species}
              name={character.name}
            >
              {character.name}
            </User>
          );
        case 'status':
          return (
            <Chip
              className='capitalize'
              color={statusColorMap[character.status]}
              size='sm'
              variant='flat'
            >
              {character.status}
            </Chip>
          );
        case 'species':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm capitalize'>
                {character.species}
              </p>
              {character.type && (
                <p className='text-bold text-sm capitalize text-default-400'>
                  {character.type}
                </p>
              )}
            </div>
          );
        case 'gender':
          return (
            <p className='text-bold text-sm capitalize'>{character.gender}</p>
          );
        case 'origin':
          return (
            <p className='text-bold text-sm capitalize'>
              {character.origin.name}
            </p>
          );
        case 'location':
          return (
            <p className='text-bold text-sm capitalize'>
              {character.location.name}
            </p>
          );
        case 'episodes':
          return (
            <Chip color='primary' size='sm' variant='flat'>
              {character.episode.length} episodes
            </Chip>
          );
        default:
          return String(cellValue || '');
      }
    },
    []
  );

  // Top content with search, filters, and controls
  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        {/* Header with title and controls */}
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-portal-green via-rick-yellow to-rick-red bg-clip-text text-transparent'>
              Rick and Morty Explorer
            </h1>
            <p className='text-default-500 mt-1'>
              Search and explore characters from the multiverse
            </p>
          </div>
          <div className='flex gap-2'>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Search and filters */}
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder={t('search')}
            startContent={<MagnifyingGlassIcon className='h-4 w-4' />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Select
              isClearable
              isMultiline
              className='w-40'
              label='Status'
              placeholder='Select status'
              selectedKeys={new Set(statusFilter)}
              selectionMode='multiple'
              size='sm'
              variant='flat'
              onSelectionChange={keys => {
                const selectedValues = Array.from(keys) as string[];

                if (onStatusFilter) {
                  onStatusFilter(selectedValues);
                }
              }}
            >
              <SelectItem key='Alive'>Alive</SelectItem>
              <SelectItem key='Dead'>Dead</SelectItem>
              <SelectItem key='unknown'>Unknown</SelectItem>
            </Select>
            <Select
              isClearable
              isMultiline
              className='w-40'
              label='Gender'
              placeholder='Select gender'
              selectedKeys={new Set(genderFilter)}
              selectionMode='multiple'
              size='sm'
              variant='flat'
              onSelectionChange={keys => {
                const selectedValues = Array.from(keys) as string[];

                if (onGenderFilter) {
                  onGenderFilter(selectedValues);
                }
              }}
            >
              <SelectItem key='Male'>Male</SelectItem>
              <SelectItem key='Female'>Female</SelectItem>
              <SelectItem key='Genderless'>Genderless</SelectItem>
              <SelectItem key='unknown'>Unknown</SelectItem>
            </Select>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={
                    <ChevronDownIcon className='text-small h-4 w-4' />
                  }
                  variant='flat'
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={new Set(visibleColumns)}
                selectionMode='multiple'
                onSelectionChange={keys => {
                  const selectedCols = Array.from(keys) as string[];

                  if (onColumnsChange) {
                    onColumnsChange(selectedCols);
                  }
                }}
              >
                {columns.map(column => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Results count */}
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {filteredCharacters.length} characters
          </span>
          <span className='text-default-400 text-small'>20 per page</span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    genderFilter,
    speciesFilter,
    visibleColumns,
    filteredCharacters.length,
    onSearchChange,
    onClear,
    onStatusFilter,
    onGenderFilter,
    onSpeciesFilter,
    onColumnsChange,
    t,
  ]);

  // Bottom content with pagination
  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          Showing {filteredCharacters.length} characters
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={currentPage}
          total={totalPages}
          onChange={onPageChange}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={currentPage <= 1}
            size='sm'
            variant='flat'
            onPress={() => onPageChange && onPageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            isDisabled={currentPage >= totalPages}
            size='sm'
            variant='flat'
            onPress={() => onPageChange && onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [filteredCharacters.length, currentPage, totalPages, onPageChange]);

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-danger mb-2'>
            {t('error')}
          </h3>
          <p className='text-danger-600'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Table
        aria-label='Rick and Morty Characters Table'
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[600px]',
        }}
        selectedKeys={
          selectedCharacter ? new Set([selectedCharacter]) : new Set()
        }
        selectionMode='single'
        topContent={topContent}
        topContentPlacement='outside'
        onSelectionChange={keys => {
          const selectedKey = Array.from(keys)[0] as string;

          if (onCharacterSelect && selectedKey) {
            onCharacterSelect(selectedKey);
          }
        }}
      >
        <TableHeader columns={headerColumns}>
          {column => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'episodes' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent='No characters found'
          isLoading={loading}
          items={filteredCharacters}
          loadingContent={<Spinner color='primary' label={t('loading')} />}
        >
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CharacterTable;
