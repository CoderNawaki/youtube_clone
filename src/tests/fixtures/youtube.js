export const newCategoryVideos = [
  {
    id: { videoId: 'video-1' },
    snippet: {
      title: 'Mock video title',
      channelId: 'channel-1',
      channelTitle: 'Mock channel',
      publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      thumbnails: {
        high: {
          url: 'https://example.com/image.jpg',
        },
      },
    },
  },
];

export const codingCategoryVideos = [
  {
    id: { videoId: 'video-2' },
    snippet: {
      title: 'Coding deep dive',
      channelId: 'channel-2',
      channelTitle: 'Mock coding channel',
      publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      thumbnails: {
        high: {
          url: 'https://example.com/coding.jpg',
        },
      },
    },
  },
];
