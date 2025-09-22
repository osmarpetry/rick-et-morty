import React, { useState, useEffect } from 'react';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Icon } from '@iconify/react';

import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

interface SearchBarProps {
  value: string;
  statusValues: string[];
  genderValues: string[];
  columnValues: ('name' | 'status' | 'species' | 'gender')[];
  onChange: (val: string) => void;
  onClear?: () => void;
  onStatusChange: (vals: string[]) => void;
  onGenderChange: (vals: string[]) => void;
  onColumnsChange: (vals: ('name' | 'status' | 'species' | 'gender')[]) => void;
}

export default function SearchBar({
  value,
  statusValues,
  genderValues,
  columnValues,
  onChange,
  onClear,
  onStatusChange,
  onGenderChange,
  onColumnsChange,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = useDebouncedCallback(onChange, 500);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    if (onClear) {
      onClear();
    } else {
      onChange(''); // Immediate API call for clear
    }
  };

  return (
    <div className='w-full flex flex-col gap-3'>
      {/* Search input - full width */}
      <div className='w-full'>
        <Input
          isClearable
          aria-label='Search characters'
          classNames={{
            inputWrapper: 'h-14 min-h-14', // 56px height
            input: 'h-14',
          }}
          placeholder='Search Rick and Morty characters...'
          size='md'
          startContent={
            <Icon
              className='text-default-400'
              height={18}
              icon='lucide:search'
              width={18}
            />
          }
          value={inputValue}
          onClear={handleClear}
          onValueChange={handleInputChange}
        />
      </div>

      {/* Filters row - three selects */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-3'>
        <Select
          isClearable
          aria-label='Filter by status'
          className='w-full'
          classNames={{ trigger: 'h-14 min-h-14' }} // 56px height
          label='Status'
          placeholder='All'
          selectedKeys={new Set(statusValues)}
          selectionMode='multiple'
          size='md'
          onSelectionChange={keys =>
            onStatusChange(Array.from(keys as Set<React.Key>).map(String))
          }
        >
          <SelectItem key='Alive'>Alive</SelectItem>
          <SelectItem key='Dead'>Dead</SelectItem>
          <SelectItem key='unknown'>Unknown</SelectItem>
        </Select>

        <Select
          isClearable
          aria-label='Filter by gender'
          className='w-full'
          classNames={{ trigger: 'h-14 min-h-14' }} // 56px height
          label='Gender'
          placeholder='All'
          selectedKeys={new Set(genderValues)}
          selectionMode='multiple'
          size='md'
          onSelectionChange={keys =>
            onGenderChange(Array.from(keys as Set<React.Key>).map(String))
          }
        >
          <SelectItem key='Female'>Female</SelectItem>
          <SelectItem key='Male'>Male</SelectItem>
          <SelectItem key='Genderless'>Genderless</SelectItem>
          <SelectItem key='unknown'>Unknown</SelectItem>
        </Select>

        <Select
          isClearable
          aria-label='Visible columns'
          className='w-full'
          classNames={{ trigger: 'h-14 min-h-14' }} // 56px height
          label='Columns'
          placeholder='Choose'
          selectedKeys={new Set(columnValues)}
          selectionMode='multiple'
          size='md'
          onSelectionChange={keys =>
            onColumnsChange(
              Array.from(keys as Set<React.Key>).map(
                k => k as 'name' | 'status' | 'species' | 'gender'
              )
            )
          }
        >
          <SelectItem key='name'>Name</SelectItem>
          <SelectItem key='status'>Status</SelectItem>
          <SelectItem key='species'>Species</SelectItem>
          <SelectItem key='gender'>Gender</SelectItem>
        </Select>
      </div>
    </div>
  );
}
