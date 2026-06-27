const STORAGE_KEY = 'yt_recently_watched';
const MAX_ITEMS = 10;

export const getRecentlyWatched = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addRecentlyWatched = (video) => {
  try {
    const current = getRecentlyWatched();
    const filtered = current.filter((v) => v.id !== video.id);
    const updated = [
      { ...video, watchedAt: new Date().toISOString() },
      ...filtered,
    ].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};
