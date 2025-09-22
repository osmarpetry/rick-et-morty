/**
 * Unit tests for useTableUrlState hook
 * Tests URL parameter synchronization and state management
 */

import { renderHook, act } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTableUrlState } from '@/hooks/useTableUrlState';
import { vi } from 'vitest';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockPush = vi.fn();
const mockSearchParams = {
  get: vi.fn(),
  toString: vi.fn(() => ''),
};

describe('useTableUrlState Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as any).mockReturnValue(mockSearchParams);
  });

  describe('Initial State', () => {
    it('should initialize with default values when no URL parameters', () => {
      mockSearchParams.get.mockReturnValue(null);

      const { result } = renderHook(() => useTableUrlState());

      expect(result.current.page).toBe(1);
      expect(result.current.search).toBe('');
      expect(result.current.status).toEqual([]);
      expect(result.current.gender).toEqual([]);
      expect(result.current.species).toEqual([]);
      expect(result.current.columns).toEqual([
        'name',
        'status',
        'species',
        'gender',
      ]);
      expect(result.current.selectedCharacter).toBe('');
    });

    it('should parse URL parameters correctly', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        const params: Record<string, string> = {
          page: '2',
          search: 'rick',
          status: 'Alive,Dead',
          gender: 'Male',
          columns: 'name,status',
          character: '123',
        };
        return params[key] || null;
      });

      const { result } = renderHook(() => useTableUrlState());

      expect(result.current.page).toBe(2);
      expect(result.current.search).toBe('rick');
      expect(result.current.status).toEqual(['Alive', 'Dead']);
      expect(result.current.gender).toEqual(['Male']);
      expect(result.current.columns).toEqual(['name', 'status']);
      expect(result.current.selectedCharacter).toBe('123');
    });

    it('should handle invalid page parameter', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        return key === 'page' ? 'invalid' : null;
      });

      const { result } = renderHook(() => useTableUrlState());

      expect(result.current.page).toBe(1); // Should fallback to default
    });
  });

  describe('State Updates', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue(null);
      mockSearchParams.toString.mockReturnValue('');
    });

    it('should update page correctly', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setPage(3);
      });

      expect(mockPush).toHaveBeenCalledWith('?page=3', { scroll: false });
    });

    it('should update search and reset page', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setSearch('morty');
      });

      expect(mockPush).toHaveBeenCalledWith('?search=morty', { scroll: false });
    });

    it('should update status filter and reset page', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setStatusFilter(['Alive', 'Dead']);
      });

      expect(mockPush).toHaveBeenCalledWith('?status=Alive%2CDead', {
        scroll: false,
      });
    });

    it('should update gender filter and reset page', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setGenderFilter(['Male']);
      });

      expect(mockPush).toHaveBeenCalledWith('?gender=Male', { scroll: false });
    });

    it('should update visible columns', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setVisibleColumns(['name', 'status']);
      });

      expect(mockPush).toHaveBeenCalledWith('?columns=name%2Cstatus', {
        scroll: false,
      });
    });

    it('should update selected character', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setSelectedCharacter('456');
      });

      expect(mockPush).toHaveBeenCalledWith('?character=456', {
        scroll: false,
      });
    });
  });

  describe('URL Parameter Cleanup', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue(null);
      mockSearchParams.toString.mockReturnValue('');
    });

    it('should remove page parameter when set to default value', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setPage(1); // Default value
      });

      expect(mockPush).toHaveBeenCalledWith('?', { scroll: false });
    });

    it('should remove search parameter when empty', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setSearch('');
      });

      expect(mockPush).toHaveBeenCalledWith('?', { scroll: false });
    });

    it('should remove filter parameters when empty arrays', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setStatusFilter([]);
      });

      expect(mockPush).toHaveBeenCalledWith('?', { scroll: false });
    });

    it('should remove columns parameter when set to default', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.setVisibleColumns([
          'name',
          'status',
          'species',
          'gender',
        ]);
      });

      expect(mockPush).toHaveBeenCalledWith('?', { scroll: false });
    });
  });

  describe('Reset Filters', () => {
    beforeEach(() => {
      mockSearchParams.get.mockReturnValue(null);
      mockSearchParams.toString.mockReturnValue('');
    });

    it('should reset all filters', () => {
      const { result } = renderHook(() => useTableUrlState());

      act(() => {
        result.current.resetFilters();
      });

      expect(mockPush).toHaveBeenCalledWith('?', { scroll: false });
    });
  });

  describe('Array Parameter Parsing', () => {
    it('should handle empty array parameters', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        return key === 'status' ? '' : null;
      });

      const { result } = renderHook(() => useTableUrlState());

      expect(result.current.status).toEqual([]);
    });

    it('should filter out empty values in arrays', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        return key === 'status' ? 'Alive,,Dead,' : null;
      });

      const { result } = renderHook(() => useTableUrlState());

      expect(result.current.status).toEqual(['Alive', 'Dead']);
    });
  });
});
