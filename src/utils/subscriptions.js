const STORAGE_KEY = 'yt_subscriptions';

export const getSubscriptions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isSubscribed = (channelId) => {
  const subs = getSubscriptions();
  return subs.some((s) => s.id === channelId);
};

export const toggleSubscription = (channel) => {
  const subs = getSubscriptions();
  const existing = subs.findIndex((s) => s.id === channel.id);
  if (existing >= 0) {
    subs.splice(existing, 1);
  } else {
    subs.push({
      id: channel.id,
      title: channel.title,
      thumbnail: channel.thumbnail,
      subscribedAt: new Date().toISOString(),
    });
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  } catch {
    // quota exceeded, ignore
  }
  return existing < 0;
};

export const getSubscriptionCount = () => getSubscriptions().length;
