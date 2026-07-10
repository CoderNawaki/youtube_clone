const LIKES_KEY = 'yt_video_likes';

export const getVideoLikeStatus = (videoId) => {
  try {
    const stored = localStorage.getItem(LIKES_KEY);
    const likes = stored ? JSON.parse(stored) : {};
    return likes[videoId] || null;
  } catch {
    return null;
  }
};

export const setVideoLike = (videoId, status) => {
  try {
    const stored = localStorage.getItem(LIKES_KEY);
    const likes = stored ? JSON.parse(stored) : {};
    if (status === null) {
      delete likes[videoId];
    } else {
      likes[videoId] = status;
    }
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  } catch {
    // quota exceeded, ignore
  }
};
