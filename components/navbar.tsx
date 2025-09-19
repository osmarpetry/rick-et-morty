/**
 * Simple Navbar Component
 * Contains only project name, language switcher, and theme toggle
 */

'use client';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@heroui/navbar';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';

import { Logo } from '@/components/icons';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const Navbar = () => {
  const t = useTranslations('navigation');

  return (
    <HeroUINavbar
      className='bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg'
      maxWidth='xl'
      position='sticky'
    >
      <NavbarContent justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex items-center justify-start gap-1' href='/'>
            <Logo className='text-white' />
            <p className='bg-gradient-to-r from-portal-green to-portal-pink bg-clip-text text-xl font-bold text-transparent'>
              {t('title')}
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='flex items-center gap-2'>
          <LanguageSwitcher />
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
