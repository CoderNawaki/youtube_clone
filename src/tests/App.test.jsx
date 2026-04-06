import { render, screen } from '@testing-library/react';

import App from '../App';

jest.mock('../components/layout/Navbar', () => () => <div>Navbar</div>);
jest.mock('../components/shared/LoadingState', () => () => (
  <div>Loading page...</div>
));
jest.mock('../components/routes/Feed', () => () => <div>Feed page</div>);
jest.mock('../components/routes/VideoDetail', () => () => (
  <div>Video detail page</div>
));
jest.mock('../components/routes/ChannelDetail', () => () => (
  <div>Channel detail page</div>
));
jest.mock('../components/routes/SearchFeed', () => () => (
  <div>Search feed page</div>
));

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
