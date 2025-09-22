/**
 * CharacterTablePage - Container Component (Smart Component)
 *
 * This component follows the Container/Presentational pattern:
 * - Handles all business logic, data fetching, and state management
 * - Uses Apollo Client for GraphQL data fetching
 * - Manages URL-based state for search, pagination, and filtering
 * - Delegates all presentation concerns to CharacterTableTemplate
 *
 * Key responsibilities:
 * - GraphQL query execution and data transformation
 * - URL state synchronization
 * - Event handler creation and state updates
 * - Debounced search implementation
 * - Client-side filtering for multiple selections
 */

'use client';

import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useLazyQuery } from '@apollo/client/react';

import { GET_CHARACTERS_TABLE } from '../../lib/graphql/queries/characterTable';
import { useTableUrlState } from '../../hooks/useTableUrlState';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';
import { useKeyboardNavigation } from '../organisms/AccessibilityEnhancements';
import CharacterTableTemplate from '../templates/CharacterTableTemplate';

import { Character } from '@/types';

export function CharacterTablePage() {
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
    setVisibleColumns,
    setSelectedCharacter,
  } = useTableUrlState();

  // Local state for immediate UI updates
  const [filterValue, setFilterValue] = useState(urlSearchValue);

  // Track previous values to prevent unnecessary re-executions
  const prevValuesRef = useRef({ currentPage, filter: null });

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

  // Use lazy query for better control over when to fetch
  const [executeQueryFn, { loading, error, data }] = useLazyQuery(
    GET_CHARACTERS_TABLE,
    {
      fetchPolicy: 'cache-first', // Use cache first to prevent unnecessary fetches
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    }
  );

  // Stable execute query function to prevent infinite loops
  const executeQuery = useCallback(
    (variables: { page: number; filter: any }) => {
      executeQueryFn({ variables });
    },
    [executeQueryFn]
  );

  // Execute query when dependencies change (HeroUI async pagination pattern)
  useEffect(() => {
    // Stringify filter for comparison since it's an object
    const filterString = JSON.stringify(filter);
    const prevFilterString = JSON.stringify(prevValuesRef.current.filter);

    // Only execute if values have actually changed
    if (
      prevValuesRef.current.currentPage !== currentPage ||
      prevFilterString !== filterString
    ) {
      prevValuesRef.current = { currentPage, filter };

      executeQuery({
        page: currentPage,
        filter,
      });
    }
  }, [currentPage, filter, executeQuery]);

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

  const handleSearchClear = useCallback(() => {
    handleSearchChange('');
  }, [handleSearchChange]);

  // Render the template with all required props
  return (
    <CharacterTableTemplate
      characters={characters}
      currentPage={currentPage}
      error={error?.message || null}
      filterValue={filterValue}
      genderFilter={genderFilter}
      isSearchPending={isSearchPending}
      loading={loading}
      selectedCharacter={selectedCharacter}
      selectedCharacterData={selectedCharacterData}
      statusFilter={statusFilter}
      totalPages={totalPages}
      visibleColumns={
        visibleColumns as ('name' | 'status' | 'species' | 'gender')[]
      }
      onCharacterSelect={handleCharacterSelect}
      onCloseDrawer={handleCloseDrawer}
      onColumnsChange={setVisibleColumns}
      onGenderChange={setGenderFilter}
      onPageChange={setPage}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      onStatusChange={setStatusFilter}
    />
  );
}

export default CharacterTablePage;
