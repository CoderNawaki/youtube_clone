import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import App from '../App';

vi.mock('../components/layout/Navbar', () => ({
  default: () => <div>Navbar</div>,
}));
vi.mock('../components/layout/MobileBottomNav', () => ({
  default: () => null,
}));
vi.mock('../components/shared/LoadingState', () => ({
  default: () => <div>Loading page...</div>,
}));
vi.mock('../components/routes/Feed', () => ({
  default: () => <div>Feed page</div>,
}));
vi.mock('../components/routes/VideoDetail', () => ({
  default: () => <div>Video detail page</div>,
}));
vi.mock('../components/routes/ChannelDetail', () => ({
  default: () => <div>Channel detail page</div>,
}));
vi.mock('../components/routes/SearchFeed', () => ({
  default: () => <div>Search feed page</div>,
}));

const mockLocation = (pathname) => {
  window.history.pushState({}, 'Test page', pathname);
};

describe('App routes', () => {
  it('renders the home feed route', async () => {
    mockLocation('/');
    render(<App />);

    expect(screen.getByText('Loading page...')).toBeInTheDocument();
    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(await screen.findByText('Feed page')).toBeInTheDocument();
  });

  it('renders the search route', async () => {
    mockLocation('/search/react');
    render(<App />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(await screen.findByText('Search feed page')).toBeInTheDocument();
  });

  it('renders the video detail route', async () => {
    mockLocation('/video/abc123');
    render(<App />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(await screen.findByText('Video detail page')).toBeInTheDocument();
  });
});
