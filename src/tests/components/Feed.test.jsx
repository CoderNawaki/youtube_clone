import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import Feed from '../../components/routes/Feed';
import { renderWithRouter } from '../test-utils';
import { server } from '../mocks/server';

jest.mock('../../components/video/VideoCard', () => {
  return function MockVideoCard({ video }) {
    return <div>{video.snippet.title}</div>;
  };
});

jest.mock('../../components/video/ChannelCard', () => {
  return function MockChannelCard({ channelDetail }) {
    return <div>{channelDetail.snippet.title}</div>;
  };
});

describe('Feed', () => {
  it('loads videos for the default category', async () => {
    renderWithRouter(<Feed />);

    expect(screen.getByText('Loading New videos...')).toBeInTheDocument();

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();
  });

  it('updates the feed when a different category is selected', async () => {
    const user = userEvent.setup();

    renderWithRouter(<Feed />);

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /coding/i }));

    await waitFor(() => {
      expect(screen.getByText('Coding deep dive')).toBeInTheDocument();
    });
  });

  it('shows an error state and retries the request', async () => {
    const user = userEvent.setup();

    let shouldFail = true;

    server.use(
      rest.get('https://youtube-v31.p.rapidapi.com/search', (req, res, ctx) => {
        if (shouldFail) {
          shouldFail = false;
          return res(
            ctx.status(429),
            ctx.json({
              message: 'Rate limit reached. Please try again later.',
            })
          );
        }

        return res(
          ctx.status(200),
          ctx.json({
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
          })
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
