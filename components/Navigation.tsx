/**
 * Navigation Component
 * Rick and Morty themed navigation with theme toggle and language switcher
 */

'use client';

import { useTranslations } from 'next-intl';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';

import { ThemeToggle } from './theme/ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('navigation');

  return (
    <Navbar
      className='bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-md border-b border-divider'
      maxWidth='full'
    >
      <NavbarBrand>
        <Link
          className='font-bold text-2xl bg-gradient-to-r from-portal-green via-morty-yellow to-portal-pink bg-clip-text text-transparent hover:scale-105 transition-transform'
          href='/'
        >
          🚀 Rick & Morty
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link
            className='text-foreground hover:text-primary transition-colors font-medium'
            href='/'
          >
            {t('characters')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className='text-foreground hover:text-secondary transition-colors font-medium'
            href='/episodes'
          >
            {t('episodes')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className='text-foreground hover:text-danger transition-colors font-medium'
            href='/locations'
          >
            {t('locations')}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Navigation;
