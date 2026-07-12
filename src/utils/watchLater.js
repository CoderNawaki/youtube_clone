const STORAGE_KEY = 'yt_watch_later';

export const getWatchLater = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isInWatchLater = (videoId) => {
  const list = getWatchLater();
  return list.some((v) => v.id === videoId);
};

export const toggleWatchLater = (video) => {
  const list = getWatchLater();
  const existing = list.findIndex((v) => v.id === video.id);
  if (existing >= 0) {
    list.splice(existing, 1);
  } else {
    list.unshift({
      id: video.id,
      title: video.title,
      channelTitle: video.channelTitle,
      channelId: video.channelId,
      thumbnail: video.thumbnail,
      addedAt: new Date().toISOString(),
    });
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // quota exceeded, ignore
  }
  return existing < 0;
};

export const getWatchLaterCount = () => getWatchLater().length;
