'use client';

import { useSyncExternalStore } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { applyTheme, parseTheme, themeStorageKey } from '@/lib/theme';

const themeChangeEvent = 'tap-theme-change';
const getPreference = () => parseTheme(document.documentElement.dataset.theme);
const getServerPreference = () => 'system' as const;

function subscribe(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const syncSystem = () => applyTheme(getPreference());
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey && event.key !== null) return;
    applyTheme(parseTheme(event.newValue));
    onChange();
  };
  syncSystem();
  media.addEventListener('change', syncSystem);
  window.addEventListener('storage', syncStorage);
  window.addEventListener(themeChangeEvent, onChange);
  return () => {
    media.removeEventListener('change', syncSystem);
    window.removeEventListener('storage', syncStorage);
    window.removeEventListener(themeChangeEvent, onChange);
  };
}

export function ThemeMenu() {
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    getServerPreference,
  );

  function selectTheme(value: unknown) {
    const next = parseTheme(typeof value === 'string' ? value : null);
    applyTheme(next);
    try {
      if (next === 'system') localStorage.removeItem(themeStorageKey);
      else localStorage.setItem(themeStorageKey, next);
    } catch {
      // The current page remains usable when browser storage is restricted.
    }
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="theme-trigger"
        aria-label="Appearance"
        title="Appearance"
      >
        <Sun className="theme-icon theme-icon-light" aria-hidden="true" />
        <Moon className="theme-icon theme-icon-dark" aria-hidden="true" />
        <Monitor className="theme-icon theme-icon-system" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="theme-menu">
        <DropdownMenuRadioGroup value={preference} onValueChange={selectTheme}>
          <DropdownMenuRadioItem value="light">
            <Sun aria-hidden="true" /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon aria-hidden="true" /> Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Monitor aria-hidden="true" /> System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
