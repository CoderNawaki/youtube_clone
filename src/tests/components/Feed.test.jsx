import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Feed from '../../components/Feed';
import { renderWithRouter } from '../test-utils';
import { fetchSearchVideos } from '../../utils/fetchFromAPI';

jest.mock('../../utils/fetchFromAPI', () => ({
  fetchSearchVideos: jest.fn(),
}));

jest.mock('../../components/VideoCard', () => {
  return function MockVideoCard({ video }) {
    return <div>{video.snippet.title}</div>;
  };
});

jest.mock('../../components/ChannelCard', () => {
  return function MockChannelCard({ channelDetail }) {
    return <div>{channelDetail.snippet.title}</div>;
  };
});

const mockVideos = [
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
];

describe('Feed', () => {
  beforeEach(() => {
    fetchSearchVideos.mockReset();
  });

  it('loads videos for the default category', async () => {
    fetchSearchVideos.mockResolvedValue(mockVideos);

    renderWithRouter(<Feed />);

    expect(screen.getByText('Loading New videos...')).toBeInTheDocument();

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();
    expect(fetchSearchVideos).toHaveBeenCalledWith('New');
  });

  it('updates the feed when a different category is selected', async () => {
    const user = userEvent.setup();

    fetchSearchVideos.mockResolvedValueOnce(mockVideos).mockResolvedValueOnce([
      {
        ...mockVideos[0],
        id: { videoId: 'video-2' },
        snippet: {
          ...mockVideos[0].snippet,
          title: 'Coding deep dive',
        },
      },
    ]);

    renderWithRouter(<Feed />);

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /coding/i }));

    await waitFor(() => {
      expect(fetchSearchVideos).toHaveBeenLastCalledWith('Coding');
    });

    expect(await screen.findByText('Coding deep dive')).toBeInTheDocument();
  });

  it('shows an error state and retries the request', async () => {
    const user = userEvent.setup();

    fetchSearchVideos
      .mockRejectedValueOnce(
        new Error('Rate limit reached. Please try again later.')
      )
      .mockResolvedValueOnce(mockVideos);

    renderWithRouter(<Feed />);

    expect(
      await screen.findByText('Unable to load videos')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Rate limit reached. Please try again later.')
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(await screen.findByText('Mock video title')).toBeInTheDocument();
    expect(fetchSearchVideos).toHaveBeenCalledTimes(2);
  });
});
