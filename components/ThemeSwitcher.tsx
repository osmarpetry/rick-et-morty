'use client';

import React, { useEffect } from 'react';
import { Switch } from '@heroui/switch';
import { Tooltip } from '@heroui/tooltip';
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  // Set dark theme by default on first mount if no stored preference
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      setTheme('dark');
    }
  }, [setTheme]);

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
          icon='lucide:sun'
          width={18}
          height={18}
          className={`text-default-500 ${!isDark ? 'text-primary-500' : ''}`}
        />
        <Switch
          isSelected={isDark}
          onValueChange={handleToggle}
          size='sm'
          color='primary'
          className='mx-1'
          aria-label='Toggle dark mode'
        />
        <Icon
          icon='lucide:moon'
          width={18}
          height={18}
          className={`text-default-500 ${isDark ? 'text-primary-500' : ''}`}
        />
      </div>
    </Tooltip>
  );
};
