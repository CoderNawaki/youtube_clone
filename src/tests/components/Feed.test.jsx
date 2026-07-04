import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';

import Feed from '../../components/routes/Feed';
import { renderWithRouter } from '../test-utils';
import { server } from '../mocks/server';

vi.mock('../../components/video/VideoCard', () => {
  return {
    default: function MockVideoCard({ video }) {
      return <div>{video.snippet.title}</div>;
    },
  };
});

vi.mock('../../components/video/ChannelCard', () => {
  return {
    default: function MockChannelCard({ channelDetail }) {
      return <div>{channelDetail.snippet.title}</div>;
    },
  };
});

describe('Feed', () => {
  it('loads videos for the default category', async () => {
    renderWithRouter(<Feed />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /New.*videos/
    );

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();
  });

  it('updates the feed when a different category is selected', async () => {
    const user = userEvent.setup();

    renderWithRouter(<Feed />);

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();

    const codingButtons = screen.getAllByRole('button', { name: /coding/i });
    await user.click(codingButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Coding deep dive')).toBeInTheDocument();
    });
  });

  it('shows an error state and retries the request', async () => {
    const user = userEvent.setup();

    let shouldFail = true;

    server.use(
      http.get('https://youtube-v31.p.rapidapi.com/search', ({ request }) => {
        if (shouldFail) {
          shouldFail = false;
          return HttpResponse.json(
            { message: 'Rate limit reached. Please try again later.' },
            { status: 429 }
          );
        }

        return HttpResponse.json(
          {
            items: [
              {
                id: { videoId: 'video-1' },
                snippet: {
                  title: 'Mock video title',
                  channelId: 'channel-1',
                  channelTitle: 'Mock channel',
                  thumbnails: {
                    high: {
                      url: 'https://example.com/image.jpg',
                    },
                  },
                },
              },
            ],
          },
          { status: 200 }
        );
      })
    );

    renderWithRouter(<Feed />);

    expect(
      await screen.findByText('Unable to load videos')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Rate limit reached. Please try again later.')
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();
  });
});
