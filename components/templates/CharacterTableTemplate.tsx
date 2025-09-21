/**
 * CharacterTableTemplate - Presentational Component
 * Pure template component that receives all data as props
 * Focuses solely on layout and rendering without business logic
 *
 * This component follows the Atomic Design methodology:
 * - Templates define page-level layouts
 * - They are composed of organisms, molecules, and atoms
 * - They contain no business logic or data fetching
 * - All data comes from props passed by container components
 */

import React from 'react';
import SearchBar from '../molecules/SearchBar';
import CharacterTable from '../organisms/CharacterTable';
import CharacterDrawer from '../organisms/CharacterDrawer';
import { Character } from '@/types';

interface CharacterTableTemplateProps {
  // Data props
  characters: Character[];
  selectedCharacterData: Character | null;

  // State props
  loading: boolean;
  error: string | null;
  isSearchPending: boolean;

  // Search & Filter props
  filterValue: string;
  statusFilter: string[];
  genderFilter: string[];
  visibleColumns: ('name' | 'status' | 'species' | 'gender')[];

  // Pagination props
  currentPage: number;
  totalPages: number;

  // Drawer props
  selectedCharacter: string;

  // Event handlers - all passed from container
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  onStatusChange: (values: string[]) => void;
  onGenderChange: (values: string[]) => void;
  onColumnsChange: (
    columns: ('name' | 'status' | 'species' | 'gender')[]
  ) => void;
  onPageChange: (page: number) => void;
  onCharacterSelect: (characterId: string) => void;
  onCloseDrawer: () => void;
}

/**
 * CharacterTableTemplate Component
 *
 * This template defines the layout structure for the character table page:
 * 1. Search section (flex-shrink-0) - Fixed height search bar
 * 2. Table section (flex-1) - Expandable table area
 * 3. Drawer overlay - Character detail drawer
 *
 * The template is responsive and handles different screen sizes
 * through Tailwind CSS classes and component-level responsiveness.
 */
export default function CharacterTableTemplate({
  // Data
  characters,
  selectedCharacterData,

  // State
  loading,
  error,
  isSearchPending,

  // Search & Filters
  filterValue,
  statusFilter,
  genderFilter,
  visibleColumns,

  // Pagination
  currentPage,
  totalPages,

  // Drawer
  selectedCharacter,

  // Event handlers
  onSearchChange,
  onSearchClear,
  onStatusChange,
  onGenderChange,
  onColumnsChange,
  onPageChange,
  onCharacterSelect,
  onCloseDrawer,
}: CharacterTableTemplateProps) {
  return (
    <div className='h-full flex flex-col gap-6'>
      {/* Search Section - Fixed height, contains search bar and filters */}
      <section
        className='flex-shrink-0'
        role='search'
        aria-label='Character search and filters'
      >
        <SearchBar
          columnValues={visibleColumns}
          genderValues={genderFilter}
          statusValues={statusFilter}
          value={filterValue}
          onChange={onSearchChange}
          onClear={onSearchClear}
          onColumnsChange={onColumnsChange}
          onGenderChange={onGenderChange}
          onStatusChange={onStatusChange}
        />
      </section>

      {/* Table Section - Expandable area for the main content */}
      <section
        className='flex-1 -mx-3 sm:mx-0 overflow-hidden'
        role='main'
        aria-label='Character table'
      >
        <CharacterTable
          characters={characters}
          error={error}
          loading={loading || isSearchPending}
          page={currentPage}
          pages={totalPages}
          visibleColumns={visibleColumns}
          onPageChange={onPageChange}
          onRowSelect={onCharacterSelect}
        />
      </section>

      {/* Character Detail Drawer - Overlay component */}
      <CharacterDrawer
        character={selectedCharacterData}
        isOpen={!!selectedCharacter}
        onClose={onCloseDrawer}
      />
    </div>
  );
}
