import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { AppErrorBoundary, Navbar, LoadingState } from './components/';

const Feed = lazy(() => import('./components/routes/Feed'));
const VideoDetail = lazy(() => import('./components/routes/VideoDetail'));
const ChannelDetail = lazy(() => import('./components/routes/ChannelDetail'));
const SearchFeed = lazy(() => import('./components/routes/SearchFeed'));

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }}>
      <AppErrorBoundary>
        <Navbar />
        <Suspense fallback={<LoadingState message="Loading page..." />}>
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
          </Routes>
        </Suspense>
      </AppErrorBoundary>
    </Box>
  </BrowserRouter>
);

export default App;
