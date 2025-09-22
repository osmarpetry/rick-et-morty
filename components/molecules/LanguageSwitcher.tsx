/**
 * Language Switcher Component
 * Allows users to switch between English, German, and French
 * Uses cookies to persist language choice without URL changes
 */

'use client';

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';
import { Button } from '@heroui/button';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Set locale cookie and reload to apply new locale
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=lax`;
      window.location.reload();
    });
    setIsOpen(false);
  };

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Button
          className='min-w-unit-20'
          isLoading={isPending}
          size='sm'
          startContent={!isPending && <GlobeAltIcon className='h-4 w-4' />}
          variant='flat'
        >
          {!isPending && (currentLanguage?.code.toUpperCase() || 'EN')}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Language selection'
        onAction={key => handleLanguageChange(key as string)}
      >
        {languages.map(language => (
          <DropdownItem
            key={language.code}
            className={locale === language.code ? 'bg-primary/10' : ''}
          >
            {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default LanguageSwitcher;
