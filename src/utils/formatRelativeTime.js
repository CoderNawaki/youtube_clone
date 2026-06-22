const UNITS = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'week', seconds: 604800 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
];

export const formatRelativeTime = (dateString) => {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 0) {
    return 'just now';
  }
  if (seconds < 60) {
    return 'just now';
  }

  for (const { label, seconds: unitSeconds } of UNITS) {
    const count = Math.floor(seconds / unitSeconds);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};
