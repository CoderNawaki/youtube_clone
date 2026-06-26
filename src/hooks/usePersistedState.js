import { useCallback, useEffect, useState } from 'react';

export const usePersistedState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(defaultValue);
    } catch {}
  }, [key, defaultValue]);

  return [value, setValue, remove];
};
