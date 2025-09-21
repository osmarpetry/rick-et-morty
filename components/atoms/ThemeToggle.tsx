/**
 * Rick and Morty Themed Toggle Component
 * Switches between light and dark themes with Rick and Morty styling
 */

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@heroui/button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      isIconOnly
      className={`
        transition-all duration-300 ease-in-out
        ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-portal-green to-morty-yellow text-earth-brown hover:from-morty-yellow hover:to-portal-green'
            : 'bg-gradient-to-r from-earth-brown to-lab-peach text-white hover:from-lab-peach hover:to-earth-brown'
        }
        border-2 border-transparent hover:border-current
        shadow-lg hover:shadow-xl
        transform hover:scale-105
      `}
      size='md'
      variant='flat'
      onPress={toggleTheme}
    >
      {theme === 'dark' ? (
        <SunIcon className='h-5 w-5' />
      ) : (
        <MoonIcon className='h-5 w-5' />
      )}
    </Button>
  );
}

export default ThemeToggle;
