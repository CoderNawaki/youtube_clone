const { test, expect } = require('@playwright/test');

const SEARCH_URL = 'https://youtube-v31.p.rapidapi.com/search';
const VIDEOS_URL = 'https://youtube-v31.p.rapidapi.com/videos';

const homeVideos = [
  {
    id: { videoId: 'home-video-1' },
    snippet: {
      title: 'Home video title',
      channelId: 'channel-1',
      channelTitle: 'Home channel',
      thumbnails: {
        high: {
          url: 'https://example.com/home-video.jpg',
        },
      },
    },
  },
];

const searchVideos = [
  {
    id: { videoId: 'search-video-1' },
    snippet: {
      title: 'React search result',
      channelId: 'channel-2',
      channelTitle: 'React channel',
      thumbnails: {
        high: {
          url: 'https://example.com/react-video.jpg',
        },
      },
    },
  },
];

const relatedVideos = [
  {
    id: { videoId: 'related-video-1' },
    snippet: {
      title: 'Related video title',
      channelId: 'channel-3',
      channelTitle: 'Related channel',
      thumbnails: {
        high: {
          url: 'https://example.com/related-video.jpg',
        },
      },
    },
  },
];

const videoDetail = {
  items: [
    {
      id: 'home-video-1',
      snippet: {
        title: 'Video detail heading',
        channelId: 'channel-1',
        channelTitle: 'Home channel',
      },
      statistics: {
        viewCount: '1234',
        likeCount: '56',
      },
    },
  ],
};

async function mockYouTubeAPI(page) {
  await page.route(`${SEARCH_URL}**`, async (route) => {
    const requestUrl = new URL(route.request().url());
    const query = requestUrl.searchParams.get('q');
    const relatedToVideoId = requestUrl.searchParams.get('relatedToVideoId');

    if (relatedToVideoId) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: relatedVideos }),
      });
      return;
    }

    if (query === 'React') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: searchVideos }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ items: homeVideos }),
    });
  });

  await page.route(`${VIDEOS_URL}**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(videoDetail),
    });
  });
}

test.beforeEach(async ({ page }) => {
  await mockYouTubeAPI(page);
});

test('loads the homepage feed', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Home video title')).toBeVisible();
  await expect(page.getByText(/New/i).first()).toBeVisible();
});

test('completes the search flow', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search...');

  await searchInput.fill('React');
  await searchInput.press('Enter');

  await expect(page).toHaveURL(/\/search\/React$/);
  await expect(page.getByText('React search result')).toBeVisible();
});

test('navigates from the feed to the video detail page', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Home video title').click();

  await expect(page).toHaveURL(/\/video\/home-video-1$/);
  await expect(page.getByText('Video detail heading')).toBeVisible();
  await expect(page.getByText('Related video title')).toBeVisible();
});
