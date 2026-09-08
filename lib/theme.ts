export type ThemePreference = 'light' | 'dark' | 'system';

export const themeStorageKey = 'tap-theme';

export function parseTheme(value: string | null | undefined): ThemePreference {
  return value === 'light' || value === 'dark' ? value : 'system';
}

export function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  root.dataset.theme = preference;
  root.classList.toggle(
    'dark',
    preference === 'dark' ||
      (preference === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  );
}

// Runs in the document head, before the page is painted or React hydrates.
// CSS also follows the system theme when JavaScript or storage is unavailable.
export const themeInitScript = `(() => {
  let theme = 'system';
  try {
    const saved = localStorage.getItem('${themeStorageKey}');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch {}
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
})();`;
