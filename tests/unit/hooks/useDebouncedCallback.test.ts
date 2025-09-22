/**
 * Unit tests for useDebouncedCallback hook
 * Tests debouncing functionality and cleanup behavior
 */

import { renderHook, act } from '@testing-library/react';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { vi } from 'vitest';

// Use fake timers for testing debounce behavior
vi.useFakeTimers();

describe('useDebouncedCallback Hook', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should debounce callback execution', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, 500)
    );

    // Call the debounced function multiple times
    act(() => {
      result.current('test1');
      result.current('test2');
      result.current('test3');
    });

    // Callback should not be called yet
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time by 499ms (just before delay)
    act(() => {
      vi.advanceTimersByTime(499);
    });

    // Still should not be called
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time by 1ms more (completing the delay)
    act(() => {
      vi.advanceTimersByTime(1);
    });

    // Now callback should be called once with the last arguments
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('test3');
  });

  it('should reset timer on subsequent calls', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, 500)
    );

    // First call
    act(() => {
      result.current('first');
    });

    // Advance time by 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Second call (should reset timer)
    act(() => {
      result.current('second');
    });

    // Advance time by 300ms (total 600ms from first call, but only 300ms from second)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Callback should not be called yet
    expect(mockCallback).not.toHaveBeenCalled();

    // Advance time by 200ms more (500ms from second call)
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Now callback should be called with second argument
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('second');
  });

  it('should handle multiple arguments correctly', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, 300)
    );

    act(() => {
      result.current('arg1', 'arg2', 'arg3');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  it('should handle different delay values', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, 1000)
    );

    act(() => {
      result.current('test');
    });

    // Should not be called before delay
    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(mockCallback).not.toHaveBeenCalled();

    // Should be called after delay
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should update when callback changes', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ callback }) => useDebouncedCallback(callback, 500),
      { initialProps: { callback: mockCallback1 } }
    );

    // Call with first callback
    act(() => {
      result.current('test1');
    });

    // Change callback - this should clear the previous timeout
    rerender({ callback: mockCallback2 });

    // Complete the delay - no callback should be called since timeout was cleared
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Neither callback should be called since timeout was cleared on dependency change
    expect(mockCallback1).not.toHaveBeenCalled();
    expect(mockCallback2).not.toHaveBeenCalled();

    // Call again with new callback
    act(() => {
      result.current('test2');
    });

    // Complete the delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now the new callback should be called
    expect(mockCallback2).toHaveBeenCalledWith('test2');
  });

  it('should update when delay changes', () => {
    const mockCallback = vi.fn();

    const { result, rerender } = renderHook(
      ({ delay }) => useDebouncedCallback(mockCallback, delay),
      { initialProps: { delay: 500 } }
    );

    // Call with initial delay
    act(() => {
      result.current('test');
    });

    // Change delay - this should clear the previous timeout
    rerender({ delay: 1000 });

    // Advance by original delay - callback should not be called since timeout was cleared
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockCallback).not.toHaveBeenCalled();

    // Advance by remaining time - still should not be called
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockCallback).not.toHaveBeenCalled();

    // Call again with new delay
    act(() => {
      result.current('test2');
    });

    // Advance by new delay
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Now should be called
    expect(mockCallback).toHaveBeenCalledWith('test2');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout on unmount', () => {
    const mockCallback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(mockCallback, 500)
    );

    act(() => {
      result.current('test');
    });

    // Unmount before delay completes
    unmount();

    // Complete the delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Callback should not be called
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should handle zero delay', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(mockCallback, 0));

    act(() => {
      result.current('test');
    });

    // Should be called immediately on next tick
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(mockCallback).toHaveBeenCalledWith('test');
  });
});
