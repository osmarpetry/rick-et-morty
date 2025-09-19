/**
 * Navigation Component
 * Simple navigation with project name, language switcher, and theme toggle
 */

'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './theme/ThemeToggle';
import { Logo } from '@/components/icons';

export function Navigation() {
  const t = useTranslations('navigation');

  return (
    <Navbar
      className='bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg'
      maxWidth='xl'
      position='sticky'
    >
      <NavbarContent justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <Link className='flex items-center justify-start gap-1' href='/'>
            <Logo className='text-white' />
            <p className='bg-gradient-to-r from-portal-green to-portal-pink bg-clip-text text-xl font-bold text-transparent'>
              {t('title')}
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='flex items-center gap-2'>
          <LanguageSwitcher />
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Navigation;
