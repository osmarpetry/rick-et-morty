/**
 * CharacterTableContainer - Smart Component
 * Handles Apollo Client data fetching for the CharacterTable component
 * Uses URL parameters for state management (search, pagination, sorting, filtering)
 */

'use client';

import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';

import { GET_CHARACTERS_TABLE } from '../lib/graphql/queries/characterTable';
import { useTableUrlState } from '../hooks/useTableUrlState';
import { useDebouncedCallback } from '../hooks/useDebouncedCallback';

import SearchBar from './search-bar';
import CharacterTable from './character-table';
import CharacterDrawer from './character-drawer';
import { useKeyboardNavigation } from './AccessibilityEnhancements';

import { Character } from '@/types';

export function CharacterTableContainer() {
  // Enable keyboard navigation
  useKeyboardNavigation();

  // Use the URL state management hook
  const {
    page: currentPage,
    search: urlSearchValue,
    status: statusFilter,
    gender: genderFilter,
    species: speciesFilter,
    columns: visibleColumns,
    selectedCharacter,
    setPage,
    setSearch,
    setStatusFilter,
    setGenderFilter,
    setSpeciesFilter,
    setVisibleColumns,
    setSelectedCharacter,
  } = useTableUrlState();

  // Local state for immediate UI updates
  const [filterValue, setFilterValue] = useState(urlSearchValue);

  // Sync local state with URL state
  useEffect(() => {
    setFilterValue(urlSearchValue);
  }, [urlSearchValue]);

  // Debounced function to update URL (and trigger API calls)
  const debouncedSetSearch = useDebouncedCallback(setSearch, 500);

  // Handle search input changes
  const handleSearchChange = useCallback(
    (value: string) => {
      // Update UI immediately
      setFilterValue(value);
      // Update URL (and trigger API) after debounce delay
      debouncedSetSearch(value);
    },
    [debouncedSetSearch]
  );

  // Track if we're waiting for debounced search
  const isSearchPending = filterValue !== urlSearchValue;

  // Build filter object for GraphQL query (server-side filtering)
  const filter = useMemo(() => {
    const filterObj: any = {};

    // Use URL search value for API calls (this is already debounced)
    if (urlSearchValue) {
      filterObj.name = urlSearchValue;
    }

    // Use server-side filtering for single selections
    if (statusFilter.length === 1) {
      filterObj.status = statusFilter[0];
    }
    if (genderFilter.length === 1) {
      filterObj.gender = genderFilter[0];
    }
    if (speciesFilter.length === 1) {
      filterObj.species = speciesFilter[0];
    }

    return Object.keys(filterObj).length > 0 ? filterObj : undefined;
  }, [urlSearchValue, statusFilter, genderFilter, speciesFilter]);

  // Execute GraphQL query
  const { loading, error, data } = useQuery(GET_CHARACTERS_TABLE, {
    variables: {
      page: currentPage,
      filter,
    },
    notifyOnNetworkStatusChange: true,
  });

  // Transform API data to component format
  const characters: Character[] = useMemo(() => {
    if (!data?.characters?.results) return [];

    let transformedCharacters = data.characters.results
      .filter(character => character !== null)
      .map(character => ({
        id: character!.id || '',
        name: character!.name || 'Unknown',
        status:
          (character!.status as 'Alive' | 'Dead' | 'unknown') || 'unknown',
        species: character!.species || '',
        type: character!.type || '',
        gender:
          (character!.gender as 'Female' | 'Male' | 'Genderless' | 'unknown') ||
          'unknown',
        origin: {
          name: character!.origin?.name || 'Unknown',
          url: '',
        },
        location: {
          name: character!.location?.name || 'Unknown',
          url: '',
        },
        image: character!.image || '',
        episode:
          character!.episode
            ?.filter(ep => ep !== null)
            .map(ep => ep!.id || '') || [],
        url: '',
        created: character!.created || '',
      }));

    // Apply client-side filtering only for multiple selections (server-side can't handle multiple values)
    const needsClientSideFiltering =
      statusFilter.length > 1 ||
      genderFilter.length > 1 ||
      speciesFilter.length > 1;

    if (needsClientSideFiltering) {
      transformedCharacters = transformedCharacters.filter(character => {
        const statusMatch =
          statusFilter.length === 0 || statusFilter.includes(character.status);
        const genderMatch =
          genderFilter.length === 0 || genderFilter.includes(character.gender);
        const speciesMatch =
          speciesFilter.length === 0 ||
          speciesFilter.includes(character.species);

        return statusMatch && genderMatch && speciesMatch;
      });
    }

    return transformedCharacters;
  }, [data, statusFilter, genderFilter, speciesFilter]);

  // Get pagination info
  const totalPages = data?.characters?.info?.pages || 1;

  // Find selected character for drawer
  const selectedCharacterData = selectedCharacter
    ? characters.find(char => char.id === selectedCharacter) || null
    : null;

  // Handle character selection and drawer
  const handleCharacterSelect = useCallback(
    (characterId: string) => {
      setSelectedCharacter(characterId);
    },
    [setSelectedCharacter]
  );

  const handleCloseDrawer = useCallback(() => {
    setSelectedCharacter('');
  }, [setSelectedCharacter]);

  return (
    <div className='h-full flex flex-col gap-6'>
      <section className='flex-shrink-0'>
        <SearchBar
          columnValues={
            visibleColumns as ('name' | 'status' | 'species' | 'gender')[]
          }
          genderValues={genderFilter}
          statusValues={statusFilter}
          value={filterValue}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          onColumnsChange={cols => setVisibleColumns(cols)}
          onGenderChange={setGenderFilter}
          onStatusChange={setStatusFilter}
        />
      </section>

      <section className='flex-1 -mx-3 sm:mx-0 overflow-hidden'>
        <CharacterTable
          characters={characters}
          error={error?.message || null}
          loading={loading || isSearchPending}
          page={currentPage}
          pages={totalPages}
          visibleColumns={
            visibleColumns as ('name' | 'status' | 'species' | 'gender')[]
          }
          onPageChange={setPage}
          onRowSelect={handleCharacterSelect}
        />
      </section>

      <CharacterDrawer
        character={selectedCharacterData}
        isOpen={!!selectedCharacter}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}

export default CharacterTableContainer;
