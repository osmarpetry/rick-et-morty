/**
 * Custom hook for managing table state via URL parameters
 * Provides URL-based state management for table filtering, sorting, and pagination
 */

'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Default values for table state
const DEFAULT_VALUES = {
  page: 1,
  search: '',
  status: [] as string[],
  gender: [] as string[],
  species: [] as string[],
  columns: ['name', 'status', 'species', 'gender'] as string[],
  selectedCharacter: '',
};

export interface TableState {
  page: number;
  search: string;
  status: string[];
  gender: string[];
  species: string[];
  columns: string[];
  selectedCharacter: string;
}

export interface TableStateActions {
  updateURL: (
    updates: Partial<Record<string, string | number | string[] | null>>
  ) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: string[]) => void;
  setGenderFilter: (gender: string[]) => void;
  setSpeciesFilter: (species: string[]) => void;
  setVisibleColumns: (columns: string[]) => void;
  setSelectedCharacter: (characterId: string) => void;
  resetFilters: () => void;
}

export type UseTableUrlStateReturn = TableState & TableStateActions;

/**
 * Custom hook for managing table state through URL parameters
 * Provides synchronization between table state and browser URL
 */
export function useTableUrlState(): UseTableUrlStateReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse array parameters from URL with proper defaults
  const parseArrayParam = (
    param: string | null,
    defaultValue: string[]
  ): string[] => {
    if (!param) return defaultValue;

    const parsed = param.split(',').filter(Boolean);

    return parsed.length > 0 ? parsed : defaultValue;
  };

  // Get current state from URL parameters
  const currentState: TableState = {
    page: parseInt(searchParams.get('page') || String(DEFAULT_VALUES.page), 10),
    search: searchParams.get('search') || DEFAULT_VALUES.search,
    status: parseArrayParam(searchParams.get('status'), DEFAULT_VALUES.status),
    gender: parseArrayParam(searchParams.get('gender'), DEFAULT_VALUES.gender),
    species: parseArrayParam(
      searchParams.get('species'),
      DEFAULT_VALUES.species
    ),
    columns: parseArrayParam(
      searchParams.get('columns'),
      DEFAULT_VALUES.columns
    ),
    selectedCharacter:
      searchParams.get('character') || DEFAULT_VALUES.selectedCharacter,
  };

  // Helper function to update URL parameters
  const updateURL = useCallback(
    (updates: Partial<Record<string, string | number | string[] | null>>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        // Check if value should be removed from URL
        const shouldRemove =
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0) ||
          (key === 'page' && value === DEFAULT_VALUES.page) ||
          (key === 'search' && value === DEFAULT_VALUES.search) ||
          (key === 'columns' &&
            Array.isArray(value) &&
            JSON.stringify(value) === JSON.stringify(DEFAULT_VALUES.columns)) ||
          (key === 'character' && value === DEFAULT_VALUES.selectedCharacter);

        if (shouldRemove) {
          newSearchParams.delete(key);
        } else if (Array.isArray(value)) {
          newSearchParams.set(key, value.join(','));
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      router.push(`?${newSearchParams.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Action handlers
  const setPage = useCallback(
    (page: number) => {
      updateURL({ page });
    },
    [updateURL]
  );

  const setSearch = useCallback(
    (search: string) => {
      updateURL({ search, page: null }); // Reset to page 1 when searching
    },
    [updateURL]
  );

  const setStatusFilter = useCallback(
    (status: string[]) => {
      updateURL({ status, page: null }); // Reset to page 1 when filtering
    },
    [updateURL]
  );

  const setGenderFilter = useCallback(
    (gender: string[]) => {
      updateURL({ gender, page: null }); // Reset to page 1 when filtering
    },
    [updateURL]
  );

  const setSpeciesFilter = useCallback(
    (species: string[]) => {
      updateURL({ species, page: null }); // Reset to page 1 when filtering
    },
    [updateURL]
  );

  const setVisibleColumns = useCallback(
    (columns: string[]) => {
      updateURL({ columns });
    },
    [updateURL]
  );

  const setSelectedCharacter = useCallback(
    (characterId: string) => {
      updateURL({ character: characterId });
    },
    [updateURL]
  );

  const resetFilters = useCallback(() => {
    updateURL({
      search: null,
      status: null,
      gender: null,
      species: null,
      page: null,
    });
  }, [updateURL]);

  return {
    ...currentState,
    updateURL,
    setPage,
    setSearch,
    setStatusFilter,
    setGenderFilter,
    setSpeciesFilter,
    setVisibleColumns,
    setSelectedCharacter,
    resetFilters,
  };
}

export default useTableUrlState;
