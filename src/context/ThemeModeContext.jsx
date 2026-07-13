import { createContext, useContext, useMemo } from 'react';
import { usePersistedState } from '../hooks';

const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = usePersistedState('yt_theme_mode', 'dark');

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode, setMode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return ctx;
};
