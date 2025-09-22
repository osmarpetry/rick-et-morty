'use client';

import React, { useEffect, useState } from 'react';
import { Switch } from '@heroui/switch';
import { Tooltip } from '@heroui/tooltip';
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
    // Set dark theme by default on first mount if no stored preference
    if (!localStorage.getItem('theme')) {
      setTheme('dark');
    }
  }, [setTheme]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className='flex items-center gap-2'>
        <Icon
          className='text-default-500'
          height={18}
          icon='lucide:sun'
          width={18}
        />
        <Switch
          isDisabled
          aria-label='Toggle dark mode'
          className='mx-1'
          color='primary'
          isSelected={false}
          size='sm'
        />
        <Icon
          className='text-default-500'
          height={18}
          icon='lucide:moon'
          width={18}
        />
      </div>
    );
  }

  const isDark = theme === 'dark';

  const handleToggle = (val: boolean) => {
    setTheme(val ? 'dark' : 'light');
  };

  return (
    <Tooltip
      content={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      placement='bottom'
    >
      <div className='flex items-center gap-2'>
        <Icon
          className={`text-default-500 ${!isDark ? 'text-primary-500' : ''}`}
          height={18}
          icon='lucide:sun'
          width={18}
        />
        <Switch
          aria-label='Toggle dark mode'
          className='mx-1'
          color='primary'
          isSelected={isDark}
          size='sm'
          onValueChange={handleToggle}
        />
        <Icon
          className={`text-default-500 ${isDark ? 'text-primary-500' : ''}`}
          height={18}
          icon='lucide:moon'
          width={18}
        />
      </div>
    </Tooltip>
  );
};
