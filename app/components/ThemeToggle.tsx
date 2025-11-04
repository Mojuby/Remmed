'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle focus-ring"
      data-enabled={theme === 'dark'}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-toggle-button flex items-center justify-center">
        {theme === 'light' ? (
          <SunIcon className="w-3 h-3 text-yellow-600" />
        ) : (
          <MoonIcon className="w-3 h-3 text-blue-600" />
        )}
      </span>
    </button>
  );
}