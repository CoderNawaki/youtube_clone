const STORAGE_KEY = 'yt_playlists';

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export const getPlaylists = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const savePlaylists = (playlists) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  } catch {
    // quota exceeded, ignore
  }
};

export const createPlaylist = (name) => {
  const playlists = getPlaylists();
  const playlist = {
    id: generateId(),
    name,
    videos: [],
    createdAt: new Date().toISOString(),
  };
  playlists.push(playlist);
  savePlaylists(playlists);
  return playlist;
};

export const deletePlaylist = (playlistId) => {
  const playlists = getPlaylists().filter((p) => p.id !== playlistId);
  savePlaylists(playlists);
};

export const renamePlaylist = (playlistId, newName) => {
  const playlists = getPlaylists();
  const target = playlists.find((p) => p.id === playlistId);
  if (target) {
    target.name = newName;
    savePlaylists(playlists);
  }
};

export const getPlaylist = (playlistId) => {
  const playlists = getPlaylists();
  return playlists.find((p) => p.id === playlistId) || null;
};

export const isInPlaylist = (playlistId, videoId) => {
  const playlist = getPlaylist(playlistId);
  return playlist ? playlist.videos.some((v) => v.id === videoId) : false;
};

export const addToPlaylist = (playlistId, video) => {
  const playlists = getPlaylists();
  const target = playlists.find((p) => p.id === playlistId);
  if (!target) {return false;}
  if (target.videos.some((v) => v.id === video.id)) {return false;}
  target.videos.push({
    id: video.id,
    title: video.title,
    channelTitle: video.channelTitle,
    channelId: video.channelId,
    thumbnail: video.thumbnail,
    addedAt: new Date().toISOString(),
  });
  savePlaylists(playlists);
  return true;
};

export const removeFromPlaylist = (playlistId, videoId) => {
  const playlists = getPlaylists();
  const target = playlists.find((p) => p.id === playlistId);
  if (!target) {return;}
  target.videos = target.videos.filter((v) => v.id !== videoId);
  savePlaylists(playlists);
};

export const getPlaylistCount = () => getPlaylists().length;
