/**
 * Accessibility Enhancement Components
 * Provides improved ARIA labels, keyboard navigation, and screen reader support
 */

'use client';

import React, { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Enhanced search input with better ARIA
export function AccessibleSearchInput({
  value,
  onChange,
  placeholder,
  isLoading,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isLoading?: boolean;
}) {
  const t = useTranslations('characters');

  return (
    <div className='relative'>
      <input
        aria-busy={isLoading}
        aria-describedby='search-help'
        aria-live='polite'
        autoComplete='off'
        className='w-full sm:max-w-[44%] px-4 py-2 pl-10 pr-4 bg-default-100 border border-default-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' // "Search characters by name"
        placeholder={placeholder}
        role='searchbox'
        spellCheck='false'
        type='text'
        value={value}
        onChange={e => onChange(e.target.value)}
        // Enhanced accessibility
        aria-label={t('searchAriaLabel')}
      />
      <MagnifyingGlassIcon
        aria-hidden='true'
        className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-default-400'
      />
      <div className='sr-only' id='search-help'>
        {t('searchHelpText')}
      </div>
    </div>
  );
}

// Keyboard navigation hook
export function useKeyboardNavigation() {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Escape key to close drawer
    if (event.key === 'Escape') {
      const closeButtons = document.querySelectorAll('[aria-label*="Close"]');
      const lastCloseButton = closeButtons[
        closeButtons.length - 1
      ] as HTMLElement;

      lastCloseButton?.click();
    }

    // Ctrl/Cmd + K to focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      const searchInput = document.querySelector(
        '[role="searchbox"]'
      ) as HTMLElement;

      searchInput?.focus();
    }

    // Alt + 1 to go to main content
    if (event.altKey && event.key === '1') {
      event.preventDefault();
      const mainContent = document.querySelector('main') as HTMLElement;

      mainContent?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Screen reader only text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className='sr-only'>{children}</span>;
}

// Skip to main content link
export function SkipToMainContent() {
  const t = useTranslations('characters');

  return (
    <a
      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      href='#main-content'
    >
      {t('skipToMain')}
    </a>
  );
}

// Enhanced button with better ARIA
export function AccessibleButton({
  children,
  onClick,
  ariaLabel,
  ariaDescribedBy,
  disabled = false,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  disabled?: boolean;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Live region for announcements
export function LiveRegion({
  message,
  priority = 'polite',
}: {
  message: string;
  priority?: 'polite' | 'assertive';
}) {
  return (
    <div aria-atomic='true' aria-live={priority} className='sr-only'>
      {message}
    </div>
  );
}

// Enhanced table with better ARIA
export function AccessibleTable({
  children,
  ariaLabel,
  ariaDescribedBy,
  ...props
}: {
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  [key: string]: any;
}) {
  const t = useTranslations('characters');

  return (
    <div
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel || t('tableAriaLabel')}
      role='table'
      {...props}
    >
      {children}
    </div>
  );
}

// Enhanced table row with better ARIA
export function AccessibleTableRow({
  children,
  ariaLabel,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className={`flex items-center ${onClick ? 'cursor-pointer hover:bg-default-100' : ''}`}
      role='row'
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Enhanced table cell with better ARIA
export function AccessibleTableCell({
  children,
  ariaLabel,
  role = 'cell',
  ...props
}: {
  children: React.ReactNode;
  ariaLabel?: string;
  role?: string;
  [key: string]: any;
}) {
  return (
    <div aria-label={ariaLabel} className='flex-1 p-2' role={role} {...props}>
      {children}
    </div>
  );
}

// Focus trap for modals/drawers
export function FocusTrap({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  const trapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !trapRef.current) return;

    const focusableElements = trapRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return <div ref={trapRef}>{children}</div>;
}

// Announcement component for screen readers
export function Announcement({
  message,
  priority = 'polite',
}: {
  message: string;
  priority?: 'polite' | 'assertive';
}) {
  const [announcement, setAnnouncement] = React.useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      // Clear announcement after a short delay
      const timer = setTimeout(() => setAnnouncement(''), 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div aria-atomic='true' aria-live={priority} className='sr-only'>
      {announcement}
    </div>
  );
}
