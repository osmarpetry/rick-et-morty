import React from 'react';
import { Card } from '@heroui/card';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Pagination } from '@heroui/pagination';
import { Avatar } from '@heroui/avatar';
import { Chip } from '@heroui/chip';
import { Icon } from '@iconify/react';

import { Character, CharacterGender, CharacterStatus } from '@/types';
type ColumnKey = 'name' | 'status' | 'species' | 'gender';

interface CharacterTableProps {
  characters: Character[] | null | undefined;
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
  onPageChange: (p: number) => void;
  onRowSelect: (id: string) => void;
  visibleColumns: ColumnKey[];
}

function statusChipColor(
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

export default function CharacterTable({
  characters,
  loading,
  error,
  page,
  pages,
  onPageChange,
  onRowSelect,
  visibleColumns,
}: CharacterTableProps) {
  const hasData = !!characters && characters.length > 0;
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Ensure we always have at least one visible column to prevent table structure errors
  const safeVisibleColumns: ColumnKey[] =
    visibleColumns && visibleColumns.length > 0
      ? visibleColumns
      : ['name', 'status', 'species', 'gender'];

  return (
    <Card className='p-0 border border-default-200 h-full flex flex-col'>
      {error && (
        <div className='p-4 bg-danger-50 border border-danger-200 rounded-lg'>
          <h3 className='text-danger-900 font-semibold'>
            Error fetching characters
          </h3>
          <p className='text-danger-700'>{error}</p>
        </div>
      )}

      {!loading && !error && !hasData && (
        <div className='p-8 text-center'>
          <div className='mx-auto w-12 h-12 rounded-full bg-content2 flex items-center justify-center mb-3'>
            <Icon
              className='text-default-500'
              height={20}
              icon='lucide:search-x'
              width={20}
            />
          </div>
          <p className='text-small font-medium'>No characters found</p>
          <p className='text-tiny text-foreground-500'>
            Try searching for a character name like &quot;Rick&quot; or{' '}
            &quot;Morty&quot;.
          </p>
        </div>
      )}

      {safeVisibleColumns.length > 0 && (
        <div ref={containerRef} className='flex-1 overflow-hidden w-full'>
          <div className='h-full overflow-auto'>
            <Table
              fullWidth
              isStriped
              removeWrapper
              aria-label='Characters table'
              onRowAction={key => onRowSelect(String(key))}
            >
              <TableHeader>
                {safeVisibleColumns.map(column => (
                  <TableColumn key={column}>{column.toUpperCase()}</TableColumn>
                ))}
              </TableHeader>
              <TableBody emptyContent={null} isLoading={loading}>
                {hasData && characters
                  ? characters.map(c => (
                      <TableRow key={c.id} textValue={c.name}>
                        {safeVisibleColumns.map(column => (
                          <TableCell key={column}>
                            {column === 'name' && (
                              <div className='flex items-center gap-3'>
                                <Avatar
                                  name={c.name}
                                  radius='md'
                                  size='sm'
                                  src={c.image}
                                />
                                <span className='font-medium'>{c.name}</span>
                              </div>
                            )}
                            {column === 'status' && (
                              <div className='flex items-center gap-2'>
                                <Icon
                                  className={
                                    c.status === 'Alive'
                                      ? 'text-success-500'
                                      : c.status === 'Dead'
                                        ? 'text-danger-500'
                                        : 'text-default-400'
                                  }
                                  height={14}
                                  icon='lucide:circle-dot'
                                  width={14}
                                />
                                <Chip
                                  className='capitalize hidden sm:inline-flex'
                                  color={statusChipColor(c.status)}
                                  size='sm'
                                  variant='flat'
                                >
                                  {c.status}
                                </Chip>
                              </div>
                            )}
                            {column === 'species' && (
                              <span className='text-small'>{c.species}</span>
                            )}
                            {column === 'gender' && (
                              <div className='flex items-center gap-2'>
                                <Icon
                                  className='text-default-500'
                                  height={16}
                                  icon={genderIcon(c.gender)}
                                  width={16}
                                />
                                <span className='text-small hidden sm:inline'>
                                  {c.gender}
                                </span>
                              </div>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : []}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className='flex justify-center py-4 flex-shrink-0'>
        <Pagination
          showControls
          color='primary'
          page={Math.max(1, page || 1)}
          total={Math.max(1, pages || 1)}
          onChange={onPageChange}
        />
      </div>
    </Card>
  );
}
