import { render, screen } from '@testing-library/react';

import App from '../App';

jest.mock('../components', () => ({
  Navbar: () => <div>Navbar</div>,
  Feed: () => <div>Feed page</div>,
  VideoDetail: () => <div>Video detail page</div>,
  ChannelDetail: () => <div>Channel detail page</div>,
  SearchFeed: () => <div>Search feed page</div>,
}));

const mockLocation = (pathname) => {
  window.history.pushState({}, 'Test page', pathname);
};

describe('App routes', () => {
  it('renders the home feed route', () => {
    mockLocation('/');
    render(<App />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Feed page')).toBeInTheDocument();
  });

  it('renders the search route', () => {
    mockLocation('/search/react');
    render(<App />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Search feed page')).toBeInTheDocument();
  });

  it('renders the video detail route', () => {
    mockLocation('/video/abc123');
    render(<App />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Video detail page')).toBeInTheDocument();
  });
});
